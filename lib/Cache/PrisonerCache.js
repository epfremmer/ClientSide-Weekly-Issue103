/**
 * File PrisonerCache.js
 *
 * @author Edward Pfremmer <epfremme@nerdery.com>
 * @author Kaitlin Muth <kmuth@nerdery.com>
 */

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _HistoryModel = require('../Model/HistoryModel');

var _HistoryModel2 = _interopRequireDefault(_HistoryModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Cache directory path
 * @const {string|*}
 */
var CACHE_DIR = _path2.default.join(__dirname, '../../.cache');

/**
 * PrisonerCache Class
 *
 * @export
 * @class PrisonerCache
 * @package ClientSideWeekly
 */

var PrisonerCache = function () {
  function PrisonerCache() {
    _classCallCheck(this, PrisonerCache);
  }

  _createClass(PrisonerCache, [{
    key: 'getHistory',

    /**
     * Return history from the cache
     *
     * @param {string} name
     * @returns {HistoryModel}
     */
    value: function getHistory(name) {
      var file = _path2.default.join(CACHE_DIR, name);
      var json = _fs2.default.existsSync(file) ? _fs2.default.readFileSync(file) : null;

      return new _HistoryModel2.default(json);
    }

    /**
     * Store serialized history in the cache
     *
     * @param {string} name
     * @param {HistoryModel} history
     * @returns {string|*}
     */

  }, {
    key: 'setHistory',
    value: function setHistory(name, history) {
      return _fs2.default.writeFileSync(_path2.default.join(CACHE_DIR, name), history.toJSON());
    }
  }]);

  return PrisonerCache;
}();

exports.default = PrisonerCache;