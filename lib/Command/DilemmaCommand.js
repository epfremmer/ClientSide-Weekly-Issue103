/**
 * File DilemmaCommand.js
 *
 * @author Edward Pfremmer <epfremme@nerdery.com>
 * @author Kaitlin Muth <kmuth@nerdery.com>
 */

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ResponseModel = require('../Model/ResponseModel');

var _ResponseModel2 = _interopRequireDefault(_ResponseModel);

var _PrisonerCache = require('../Cache/PrisonerCache');

var _PrisonerCache2 = _interopRequireDefault(_PrisonerCache);

var _ResponseProvider = require('../Provider/ResponseProvider');

var _ResponseProvider2 = _interopRequireDefault(_ResponseProvider);

var _DilemmaArguments = require('../Input/DilemmaArguments');

var DilemmaArguments = _interopRequireWildcard(_DilemmaArguments);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @const {string}
 */
var MY_NAME = 'epfremme_dba_kmuth';

/**
 * DilemmaCommand Class
 *
 * @export
 * @class DilemmaCommand
 * @package ClientSideWeekly
 */

var DilemmaCommand = function () {

  /**
   * DilemmaCommand Constructor
   *
   * @constructor
   * @param {Array} args
   */

  /**
   * @static
   * @const {string}
   */

  function DilemmaCommand(args) {
    _classCallCheck(this, DilemmaCommand);

    this.args = this._parseArgs(args);
    this.cache = new _PrisonerCache2.default();
    this.provider = new _ResponseProvider2.default();
  }

  /**
   * Return command result
   *
   * @returns {*}
   */

  /**
   * @static
   * @const {string}
   */

  _createClass(DilemmaCommand, [{
    key: 'getResult',
    value: function getResult() {
      var history = this.cache.getHistory(this.args.partnerName);

      if (history.count === 99) return _ResponseModel2.default.CONFESS;
      if (!this.args.partnerPreviousResponse) return _ResponseModel2.default.SILENT;

      history.add(new _ResponseModel2.default(this.args.partnerPreviousResponse));

      this.cache.setHistory(this.args.partnerName, history);

      return this.provider.getResponse(history).toString();
    }

    /**
     * Parse command arguments
     *
     * @private
     * @param {Array} args
     * @returns {Namespace}
     */

  }, {
    key: '_parseArgs',
    value: function _parseArgs(args) {
      return DilemmaArguments.parse(args);
    }
  }]);

  return DilemmaCommand;
}();

DilemmaCommand.NAME = 'dilemma';
DilemmaCommand.MY_NAME = MY_NAME;
exports.default = DilemmaCommand;