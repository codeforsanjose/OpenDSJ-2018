(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ReduxAct = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = asError;
function asError(action) {
  if ((typeof action === 'undefined' ? 'undefined' : _typeof(action)) === 'object' && action !== null) {
    action.error = true;
  }
  return action;
};
},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = assignAll;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function assignAll(actions, stores) {
  if (Array.isArray(actions)) {
    return actions.map(function (action) {
      return action.assignTo(stores);
    });
  }
  return Object.keys(actions).reduce(function (assigns, action) {
    return _extends(assigns, _defineProperty({}, action, actions[action].assignTo(stores)));
  }, {});
};
},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createAction = require('./createAction');

var _createAction2 = _interopRequireDefault(_createAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createAction2.default)('Batch', function () {
  for (var _len = arguments.length, actions = Array(_len), _key = 0; _key < _len; _key++) {
    actions[_key] = arguments[_key];
  }

  if (actions.length === 1 && Array.isArray(actions[0])) {
    return actions[0];
  }
  return actions;
});
},{"./createAction":5}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = bindAll;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function bindAll(actions, stores) {
  if (Array.isArray(actions)) {
    return actions.map(function (action) {
      return action.bindTo(stores);
    });
  }
  return Object.keys(actions).reduce(function (binds, action) {
    return _extends(binds, _defineProperty({}, action, actions[action].bindTo(stores)));
  }, {});
};
},{}],5:[function(require,module,exports){
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
},{"./types":11}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createReducer;

var _batch = require('./batch');

var _batch2 = _interopRequireDefault(_batch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function normalizeType(typeOrActionCreator) {
  if (typeOrActionCreator && typeOrActionCreator.getType) {
    return typeOrActionCreator.toString();
  }
  return typeOrActionCreator;
}

function createReducer() {
  var handlers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaultState = arguments[1];

  var opts = {
    payload: true,
    fallback: null
  };

  var reducer = _extends(reduce, {
    has: has, on: on, off: off, options: options
  });

  function has(typeOrActionCreator) {
    return !!handlers[normalizeType(typeOrActionCreator)];
  }

  function on(typeOrActionCreator, handler) {
    if (Array.isArray(typeOrActionCreator)) {
      typeOrActionCreator.forEach(function (action) {
        on(action, handler);
      });
    } else {
      handlers[normalizeType(typeOrActionCreator)] = handler;
    }

    return reducer;
  }

  function off(typeOrActionCreator) {
    if (Array.isArray(typeOrActionCreator)) {
      typeOrActionCreator.forEach(off);
    } else {
      delete handlers[normalizeType(typeOrActionCreator)];
    }
    return reducer;
  }

  function options(newOpts) {
    Object.keys(newOpts).forEach(function (name) {
      return opts[name] = newOpts[name];
    });
    return reducer;
  }

  if (typeof handlers === 'function') {
    var factory = handlers;
    handlers = {};
    factory(on, off);
  }

  if (!has(_batch2.default)) {
    on(_batch2.default, function (state, payload) {
      if (opts.payload) {
        return payload.reduce(reduce, state);
      } else {
        return payload.payload.reduce(reduce, state);
      }
    });
  }

  function reduce() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
    var action = arguments[1];

    if (!action || typeof action.type !== 'string') {
      return state;
    }
    if (action.type.startsWith('@@redux/')) {
      return state;
    }

    var handler = handlers[action.type] || opts.fallback;
    if (handler) {
      if (opts.payload) {
        return handler(state, action.payload, action.meta);
      } else {
        return handler(state, action);
      }
    }

    return state;
  };

  return reducer;
};
},{"./batch":3}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = disbatch;

var _batch = require('./batch');

var _batch2 = _interopRequireDefault(_batch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function disbatch(store) {
  for (var _len = arguments.length, actions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    actions[_key - 1] = arguments[_key];
  }

  if (actions && actions.length > 0) {
    if (!store || typeof store !== 'function' && typeof store.dispatch !== 'function') {
      throw new TypeError('disbatch must take either a valid Redux store or a dispatch function as first parameter');
    }

    if (typeof store.dispatch === 'function') {
      store = store.dispatch;
    }

    // store is actually the dispatch function here
    return store(_batch2.default.apply(undefined, actions));
  } else {
    if (!store || typeof store.dispatch !== 'function') {
      throw new TypeError('disbatch must take a valid Redux store with a dispatch function as first parameter');
    }

    return _extends(store, {
      disbatch: disbatch.bind(undefined, store)
    });
  }
}
},{"./batch":3}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.types = exports.asError = exports.loggers = exports.disbatch = exports.batch = exports.bindAll = exports.assignAll = exports.createReducer = exports.createAction = undefined;

var _createAction = require('./createAction');

Object.defineProperty(exports, 'createAction', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_createAction).default;
  }
});

var _createReducer = require('./createReducer');

Object.defineProperty(exports, 'createReducer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_createReducer).default;
  }
});

var _assignAll = require('./assignAll');

Object.defineProperty(exports, 'assignAll', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_assignAll).default;
  }
});

var _bindAll = require('./bindAll');

Object.defineProperty(exports, 'bindAll', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_bindAll).default;
  }
});

var _batch = require('./batch');

Object.defineProperty(exports, 'batch', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_batch).default;
  }
});

var _disbatch = require('./disbatch');

Object.defineProperty(exports, 'disbatch', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_disbatch).default;
  }
});

var _loggers = require('./loggers');

Object.defineProperty(exports, 'loggers', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_loggers).default;
  }
});

var _asError = require('./asError');

Object.defineProperty(exports, 'asError', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_asError).default;
  }
});

var _types2 = require('./types');

var _types = _interopRequireWildcard(_types2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var types = exports.types = _types;
},{"./asError":1,"./assignAll":2,"./batch":3,"./bindAll":4,"./createAction":5,"./createReducer":6,"./disbatch":7,"./loggers":9,"./types":11}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxLogger = require('./reduxLogger');

var reduxLogger = _interopRequireWildcard(_reduxLogger);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
  reduxLogger: reduxLogger
};
},{"./reduxLogger":10}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = undefined;
exports.actionTransformer = actionTransformer;

var _batch = require('../batch');

var _batch2 = _interopRequireDefault(_batch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var batchType = _batch2.default.getType();

function actionTransformer(action) {
  if (action && action.type === batchType) {
    action.payload.type = batchType;
    return action.payload;
  }
  return action;
}

var logger = exports.logger = {};

var _loop = function _loop(level) {
  if (typeof console[level] === 'function') {
    logger[level] = function levelFn() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var lastArg = args.pop();

      if (Array.isArray(lastArg) && lastArg.type === batchType) {
        lastArg.forEach(function (action) {
          console[level].apply(console, [].concat(args, [action]));
        });
      } else {
        args.push(lastArg);
        console[level].apply(console, args);
      }
    };
  }
};

for (var level in console) {
  _loop(level);
}
},{"../batch":3}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;
exports.remove = remove;
exports.has = has;
exports.check = check;
exports.all = all;
exports.clear = clear;
exports.enableChecking = enableChecking;
exports.disableChecking = disableChecking;
var types = {};
var config = {
  checkExisting: true
};

function add(name) {
  types[name] = true;
}

function remove(name) {
  types[name] = false;
}

function has(name) {
  return !!types[name];
}

function check(name) {
  if (config.checkExisting && has(name)) {
    throw new TypeError("Duplicate action type: " + name);
  }
}

function all() {
  return Object.keys(types).filter(has);
}

function clear() {
  all().forEach(remove);
}

function enableChecking() {
  config.checkExisting = true;
}

function disableChecking() {
  config.checkExisting = false;
}
},{}]},{},[8])(8)
});