function semantica(grammar, tokens) {
  let byHash = grammar.semanticsByHash;
  let byType = grammar.semanticsByType;
  let semantics = grammar.semantics;
  let currentScope = 0;

  function handleScopes(index, scope, tokens) {
    if (scope === 'new') {
      currentScope += 1;
      tokens.setScope(index, currentScope);
      tokens.setParentScope(
        index,
        tokens.getScope(tokens.getParentContext(index))
      );

      // console.log('new', index, currentScope, tokens.getParentContext(index), tokens.getScope(tokens.getParentContext(index)));
    }
    else if (scope === 'reference-previous') {
      let previous = index - 1;
      tokens.setScope(index, tokens.getScope(previous));
      tokens.setParentScope(index, tokens.getParentScope(previous));

      // console.log('ref-prev', index, tokens.getScope(previous), tokens.getParentScope(previous));
    }
    else /* reference-parent */ {
      let parent = tokens.getParentContext(index);
      tokens.setScope(index, tokens.getScope(parent));
      tokens.setParentScope(index, tokens.getParentScope(parent));

      // console.log('ref-parent', index, tokens.getScope(parent), tokens.getParentScope(parent));
    }
  }

  return {
    reset: () => {
      currentScope = 0;
    },
    handle: (index) => {
      let checks;
      let hash = byHash[tokens.getHash(index)];

      if (hash) {
        checks = hash;
      }
      else {
        let type = byType[tokens.getType(index)];
        if (type) {
          checks = type;
        }
        else {
          checks = semantics;
        }
      }

      let currentChunk = tokens.getChunk(index - 1);
      if (currentChunk) {
        tokens.setChunk(index, currentChunk);
      }

      let semantic;
      let length = checks.length;
      for (let i = 0; i < length; i += 1) {
        semantic = checks[i];
        let handler = semantic.handler;

        if (handler && handler(tokens, index)) {
          if (semantic.semantic) {
            tokens.setSemantic(index, semantic.semantic);
            tokens.setContext(index, semantic.context);
          }

          if (semantic.chunk) {
            tokens.setChunk(index, semantic.chunk);
          }
          else if (semantic.endOfChunk) {
            tokens.setChunk(index, 0);
          }
          break;
        }
      }

      if (tokens.isContextLeft(index)) {
        let scope = semantic && semantic.scope;
        handleScopes(index, scope, tokens);
      }
    },
  };
}

export default {
  semantica,
};
