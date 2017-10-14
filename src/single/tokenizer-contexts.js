import {mapContexts} from './modules/grammar-mapper';

import {
  CONTEXT_LEFT,
  UNKNOWN,
} from './constants';

function contexter(grammar, tokens) {
  let contexts = mapContexts(grammar.contexts);
  let isIgnoring = false;
  let current = 0;
  let previous = 0;
  let contextLevel = 0;
  let contextStack = Array(50);

  //make global-token a contextLeftToken
  tokens.setType(0, CONTEXT_LEFT);

  function handleContextLeft() {
    if (!isIgnoring) {
      let parent = contextStack[contextLevel];
      if (parent) {
        tokens.setParentContext(current, parent);
      }

      contextLevel += 1;
      contextStack[contextLevel] = current;

      let shouldIgnore = contexts.ignoreInside[tokens.getHash(current)];
      if (shouldIgnore) {
        isIgnoring = true;
      }
    } else /* isIgnoring */ {
      tokens.setType(current, UNKNOWN);
      tokens.setContextLeft(current, tokens.getContextLeft(previous));
    }
  }

  function handleContextRight() {
    let isContextRightOfCurrentContext =
      tokens.getHash(contextStack[contextLevel]) ===
      contexts.getMatch(tokens.getHash(current))
    ;

    if (isContextRightOfCurrentContext) {
      tokens.setContextRight(contextStack[contextLevel], current);
      tokens.setContextLeft(current, contextStack[contextLevel]);

      isIgnoring = false;
      return;
    }

    /***
     * token.isContextRight but isn't matching the previous contextLeftToken.
     * This can e.g. happen if we have context-tokens inside of comments..
     * like this -> 1) do smth 2) do smth else...
     **/
    if (isIgnoring) {
      tokens.setType(current, UNKNOWN);
    }

    tokens.setContextLeft(current, contextStack[contextLevel - 1]);
  }

  return {
    reset() {
      contextLevel = 0;
    },
    handle(index) {
      current = index;
      previous = index - 1;

      if (tokens.isContextRight(previous)) {
        contextLevel -= 1;
      }

      if (tokens.isContextLeft(current)) {
        handleContextLeft(current);
      }

      else if (tokens.isContextRight(current)) {
        handleContextRight(current);
      }

      else /* if not a context-token */ {
        let contextLeftIndex =
          tokens.isContextLeft(previous)
          ? previous
          : contextStack[contextLevel]
        ;

        tokens.setContextLeft(current, contextLeftIndex);
      }

      tokens.setContextLevel(current, contextLevel);
    },
  };
}

export default {
  contexter,
};
