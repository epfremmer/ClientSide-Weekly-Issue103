/**
 * File index.js
 *
 * @author Edward Pfremmer <epfremme@nerdery.com>
 * @author Kaitlin Muth <kmuth@nerdery.com>
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Application = require('../lib/Application');

var _Application2 = _interopRequireDefault(_Application);

var _DilemmaCommand = require('../lib/Command/DilemmaCommand');

var _DilemmaCommand2 = _interopRequireDefault(_DilemmaCommand);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var application = new _Application2.default(process.argv);

application.register(_DilemmaCommand2.default);

exports.default = application.run();