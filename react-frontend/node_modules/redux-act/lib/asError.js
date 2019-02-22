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