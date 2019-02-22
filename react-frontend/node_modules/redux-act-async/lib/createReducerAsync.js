'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = createReducerAsync;

var _reduxAct = require('redux-act');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultsState = {
    loading: false,
    request: null,
    data: null,
    error: null
};

function createReducerAsync(actionAsync) {
    var _createReducer;

    var defaultState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultsState;

    return (0, _reduxAct.createReducer)((_createReducer = {}, (0, _defineProperty3.default)(_createReducer, actionAsync.request, function (state, payload) {
        return (0, _extends3.default)({}, state, {
            request: payload,
            loading: true,
            error: null
        });
    }), (0, _defineProperty3.default)(_createReducer, actionAsync.ok, function (state, payload) {
        return (0, _extends3.default)({}, state, {
            loading: false,
            data: payload.response
        });
    }), (0, _defineProperty3.default)(_createReducer, actionAsync.error, function (state, payload) {
        return (0, _extends3.default)({}, state, {
            loading: false,
            error: payload.error
        });
    }), (0, _defineProperty3.default)(_createReducer, actionAsync.reset, function () {
        return defaultState;
    }), _createReducer), defaultState);
}