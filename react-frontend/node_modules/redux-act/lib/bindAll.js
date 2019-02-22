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