/**
 * File ResponseModel.js
 *
 * @author Edward Pfremmer <epfremme@nerdery.com>
 * @author Kaitlin Muth <kmuth@nerdery.com>
 */

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sprintf = require('sprintf');

var _sprintf2 = _interopRequireDefault(_sprintf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** @const {string} */
var SILENT = 'silent';
/** @const {string} */
var CONFESS = 'confess';

/**
 * ResponseModel Class
 *
 * @export
 * @class ResponseModel
 * @package ClientSideWeekly
 */

var ResponseModel = function () {

  /**
   * ResponseModel Constructor
   *
   * @param {string} response (defaults to silent)
   */

  /**
   * @static
   * @const {string}
   */

  function ResponseModel() {
    var response = arguments.length <= 0 || arguments[0] === undefined ? SILENT : arguments[0];

    _classCallCheck(this, ResponseModel);

    this.setValue(response);
  }

  /**
   * Test if confess response
   *
   * @returns {boolean}
   */

  /**
   * @static
   * @const {string}
   */

  _createClass(ResponseModel, [{
    key: 'isConfess',
    value: function isConfess() {
      return this.value === CONFESS;
    }

    /**
     * Test if silent response
     *
     * @returns {boolean}
     */

  }, {
    key: 'isSilent',
    value: function isSilent() {
      return this.value === SILENT;
    }

    /**
     * Set response value
     *
     * @param {string} response
     */

  }, {
    key: 'setValue',
    value: function setValue() {
      var response = arguments.length <= 0 || arguments[0] === undefined ? SILENT : arguments[0];

      if (response !== SILENT && response !== CONFESS) {
        throw new Error((0, _sprintf2.default)('Invalid response provided. Got "%s"', response));
      }

      this.value = response;
    }

    /**
     * Return response as string
     *
     * @returns {string}
     */

  }, {
    key: 'toString',
    value: function toString() {
      return this.value;
    }
  }]);

  return ResponseModel;
}();

ResponseModel.SILENT = SILENT;
ResponseModel.CONFESS = CONFESS;
exports.default = ResponseModel;