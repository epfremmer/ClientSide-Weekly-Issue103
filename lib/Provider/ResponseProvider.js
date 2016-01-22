/**
 * File ResponseProvider.js
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

var _sprintf = require('sprintf');

var _sprintf2 = _interopRequireDefault(_sprintf);

var _HistoryModel = require('../Model/HistoryModel');

var _HistoryModel2 = _interopRequireDefault(_HistoryModel);

var _ResponseModel = require('../Model/ResponseModel');

var _ResponseModel2 = _interopRequireDefault(_ResponseModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * ResponseProvider Class
 *
 * @export
 * @class ResponseProvider
 * @package ClientSideWeekly
 */

var ResponseProvider = function () {
    function ResponseProvider() {
        _classCallCheck(this, ResponseProvider);
    }

    _createClass(ResponseProvider, [{
        key: 'getResponse',

        /**
         * Return response based on partner response history
         *
         * @param {HistoryModel} history
         * @returns {ResponseModel}
         */
        value: function getResponse(history) {
            if (!(history instanceof _HistoryModel2.default)) {
                throw new Error((0, _sprintf2.default)('Expected history model. Got "%s"', typeof history === 'undefined' ? 'undefined' : _typeof(history)));
            }

            var response = new _ResponseModel2.default(_ResponseModel2.default.SILENT);
            var value = Math.floor(Math.random() * this._getRevengeCoefficient(history)) ? _ResponseModel2.default.CONFESS : _ResponseModel2.default.SILENT;

            response.setValue(value);

            return response;
        }

        /**
         * Calculate revenge factor from the number of partner confessions
         * greater than silences
         *
         * @private
         * @param {HistoryModel} history
         * @returns {number}
         */

    }, {
        key: '_getRevengeCoefficient',
        value: function _getRevengeCoefficient(history) {
            var silents = history.getSilences();
            var confessions = history.getConfessions();

            return confessions > silents ? confessions - silents + 1 : 0;
        }
    }]);

    return ResponseProvider;
}();

exports.default = ResponseProvider;