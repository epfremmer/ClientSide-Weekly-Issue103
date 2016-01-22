/**
 * File HistoryModel.js
 *
 * @author Edward Pfremmer <epfremme@nerdery.com>
 * @author Kaitlin Muth <kmuth@nerdery.com>
 */

'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _sprintf = require('sprintf');

var _sprintf2 = _interopRequireDefault(_sprintf);

var _ResponseModel = require('./ResponseModel');

var _ResponseModel2 = _interopRequireDefault(_ResponseModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Default serialized history
 * @const {string}
 */
var DEFAULT_JSON = '{"count":0,"silent":0,"confess":0}';

/**
 * HistoryModel Class
 *
 * @export
 * @class HistoryModel
 * @package ClientSideWeekly
 */

var HistoryModel = function () {
  /**
   * HistoryModel Constructor
   *
   * @constructor
   * @param {string|undefined} jsonOrUndefined
   */

  function HistoryModel(jsonOrUndefined) {
    _classCallCheck(this, HistoryModel);

    this.count = 0;
    this.silent = 0;
    this.confess = 0;

    if (jsonOrUndefined) {
      this.fromJSON(jsonOrUndefined);
    }
  }

  /**
   * Serialize history
   *
   * @return {string}
   */

  _createClass(HistoryModel, [{
    key: 'toJSON',
    value: function toJSON() {
      return JSON.stringify(_lodash2.default.create({}, this));
    }

    /**
     * Hydrate history data from JSON
     *
     * @param {string} json
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON() {
      var json = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT_JSON : arguments[0];

      var data = JSON.parse(json);

      this.count = data.count;
      this.silent = data.silent;
      this.confess = data.confess;
    }

    /**
     * Add new response model to history
     *
     * @param {ResponseModel} response
     * @throws {Error}
     */

  }, {
    key: 'add',
    value: function add(response) {
      if (!(response instanceof _ResponseModel2.default)) {
        throw new Error((0, _sprintf2.default)('Expected response model. Got "%s"', typeof response === 'undefined' ? 'undefined' : _typeof(response)));
      }

      this.count++;

      response.isSilent() && this.silent++;
      response.isConfess() && this.confess++;
    }

    /**
     * Return confessions count
     *
     * @returns {number|*}
     */

  }, {
    key: 'getConfessions',
    value: function getConfessions() {
      return this.confess;
    }

    /**
     * Return silence count
     *
     * @returns {number|*}
     */

  }, {
    key: 'getSilences',
    value: function getSilences() {
      return this.silent;
    }
  }]);

  return HistoryModel;
}();

exports.default = HistoryModel;