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