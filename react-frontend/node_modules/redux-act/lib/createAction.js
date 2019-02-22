'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createAction;

var _types = require('./types');

var id = 0;

var identity = function identity(arg) {
  return arg;
};

var normalize = function normalize(dispatchOrStore) {
  if (dispatchOrStore && typeof dispatchOrStore.dispatch === 'function') {
    return dispatchOrStore.dispatch;
  } else {
    return dispatchOrStore;
  }
};

var normalizeAll = function normalizeAll(dispatchOrStores) {
  if (Array.isArray(dispatchOrStores)) {
    return dispatchOrStores.map(normalize);
  } else {
    return normalize(dispatchOrStores);
  }
};

function createAction(description, payloadReducer, metaReducer) {
  if (typeof description === 'function') {
    metaReducer = payloadReducer;
    payloadReducer = description;
    description = undefined;
  }

  if (typeof payloadReducer !== 'function') {
    payloadReducer = identity;
  }

  if (typeof metaReducer !== 'function') {
    metaReducer = undefined;
  }

  var isSerializable = typeof description === 'string' && /^[0-9A-Z_]+$/.test(description);

  if (isSerializable) {
    (0, _types.check)(description);
    (0, _types.add)(description);
  } else {
    ++id;
  }

  var type = isSerializable ? description : '[' + id + ']' + (description ? ' ' + description : '');

  var dispatchFunctions = undefined;

  function makeAction() {
    var payload = payloadReducer.apply(undefined, arguments);

    if (metaReducer) {
      return {
        type: type,
        payload: payload,
        error: payload instanceof Error,
        meta: metaReducer.apply(undefined, arguments)
      };
    }

    return {
      type: type,
      payload: payload,
      error: payload instanceof Error
    };
  }

  var makeAndDispatch = function makeAndDispatch(dispatchs, isError) {
    return function () {
      var payloadedAction = makeAction.apply(undefined, arguments);
      if (!payloadedAction.error) {
        payloadedAction.error = isError;
      }

      if (Array.isArray(dispatchs)) {
        return dispatchs.map(function (dispatch) {
          return dispatch(payloadedAction);
        });
      } else if (dispatchs) {
        return dispatchs(payloadedAction);
      } else {
        return payloadedAction;
      }
    };
  };

  function actionCreator() {
    return makeAndDispatch(dispatchFunctions, false).apply(undefined, arguments);
  }

  actionCreator.asError = function () {
    return makeAndDispatch(dispatchFunctions, true).apply(undefined, arguments);
  };

  actionCreator.getType = function () {
    return type;
  };
  actionCreator.toString = function () {
    return type;
  };

  actionCreator.raw = makeAction;

  actionCreator.assignTo = function (dispatchOrStores) {
    dispatchFunctions = normalizeAll(dispatchOrStores);
    return actionCreator;
  };

  actionCreator.assigned = function () {
    return !!dispatchFunctions;
  };
  actionCreator.bound = function () {
    return false;
  };
  actionCreator.dispatched = actionCreator.assigned;

  actionCreator.bindTo = function (dispatchOrStores) {
    var boundActionCreator = makeAndDispatch(normalizeAll(dispatchOrStores, false));
    boundActionCreator.asError = makeAndDispatch(normalizeAll(dispatchOrStores, true));
    boundActionCreator.raw = makeAction;
    boundActionCreator.getType = actionCreator.getType;
    boundActionCreator.toString = actionCreator.toString;
    boundActionCreator.assignTo = function () {
      return boundActionCreator;
    };
    boundActionCreator.bindTo = function () {
      return boundActionCreator;
    };
    boundActionCreator.assigned = function () {
      return false;
    };
    boundActionCreator.bound = function () {
      return true;
    };
    boundActionCreator.dispatched = boundActionCreator.bound;
    return boundActionCreator;
  };

  return actionCreator;
};