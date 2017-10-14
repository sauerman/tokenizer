import {
  IDENTIFIER,
} from './constants';

function scoper(tokens, mappings) {
  let intToContext = mappings.context;
  let intToSemantic = mappings.semantic;

  function getId(index, contextLeftIndex, scopeIndex) {
    if (scopeIndex === 0) {
      return 0;
    }

    let id = tokens.isInScope(index, scopeIndex);

    if (!id) {
      let contextLeft = tokens.getContextLeft(contextLeftIndex);
      return getId(index, contextLeft, tokens.getParentScope(contextLeft));
    }

    return id;
  }

  return {
    handle(index) {
      if (tokens.getType(index) !== IDENTIFIER) {
        return;
      }

      let context = intToContext[tokens.getContext(index)];
      if (context === 'function-arguments') {
        tokens.addToScope(index);
        return;
      }

      let semantic = intToSemantic[tokens.getSemantic(index)];
      if (semantic === 'variable') {
        tokens.addToScope(index);
        return;
      }

      /**
       * instances
       **/
      if (semantic === 'object-field-instance' || semantic === 'object-field-declaration') {
        return;
      }

      let id = getId(index, index, tokens.getScope(index));
      if (id) {
        tokens.setId(index, id);
      }
    },
  };
}

export default {
  scoper,
};
