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