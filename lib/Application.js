/**
 * File Application.js
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Application Class
 *
 * @export
 * @class Application
 * @package ClientSideWeekly
 */

var Application = function () {

    /**
     * Application Constructor
     *
     * @constructor
     * @param {Array} argv
     */

    function Application() {
        var argv = arguments.length <= 0 || arguments[0] === undefined ? process.argv : arguments[0];

        _classCallCheck(this, Application);

        this.commands = {};

        this.args = argv;
        this.command = this.args.splice(2, 1);
    }

    /**
     * Run command
     *
     * @returns {*}
     */

    /**
     * Registered application commands
     * @type {object|hash}
     */

    _createClass(Application, [{
        key: 'run',
        value: function run() {
            var command = this._getCommand();

            return command.getResult();
        }

        /**
         * Register application command
         *
         * @param {function} command
         * @throws {Error}
         */

    }, {
        key: 'register',
        value: function register(command) {
            if (typeof command !== 'function') {
                throw new Error((0, _sprintf2.default)('Command must be of type function. %s provided', typeof command === 'undefined' ? 'undefined' : _typeof(command)));
            }

            if (!command.NAME) {
                throw new Error('Missing command NAME');
            }

            this.commands[command.NAME] = command;
        }

        /**
         * Return target command
         *
         * @private
         * @returns {function}
         * @throws {Error}
         */

    }, {
        key: '_getCommand',
        value: function _getCommand() {
            var name = this.command;
            var Command = undefined;

            if (!this.commands.hasOwnProperty(name)) {
                throw new Error((0, _sprintf2.default)('Command "%s" not found. Has it been registered with the Application?', name));
            }

            Command = this.commands[name];

            return new Command(this.args);
        }
    }]);

    return Application;
}();

exports.default = Application;