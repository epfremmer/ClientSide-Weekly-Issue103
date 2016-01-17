/**
 * File Application.js
 *
 * @author Edward Pfremmer <epfremme@nerdery.com>
 * @author Kaitlin Muth <kmuth@nerdery.com>
 */

'use strict';

import sprintf from 'sprintf';

/**
 * Application Class
 *
 * @export
 * @class Application
 * @package ClientSideWeekly
 */
export default class Application {
    /**
     * Registered application commands
     * @type {object|hash}
     */
    commands = {};

    /**
     * Application Constructor
     *
     * @constructor
     * @param {array} argv
     */
    constructor(argv = process.argv) {
        this.args = argv;
        this.command = this.args.splice(2, 1);
    }

    /**
     * Run command
     *
     * @returns {*}
     */
    run() {
        let command = this._getCommand();

        return command.getResult();
    }

    /**
     * Register application command
     *
     * @param {function} command
     * @throws {Error}
     */
    register(command) {
        if (typeof command !== 'function') {
            throw new Error(sprintf('Command must be of type function. %s provided', typeof command));
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
    _getCommand() {
        let name = this.command;
        let Command;

        if (!this.commands.hasOwnProperty(name)) {
            throw new Error(
                sprintf('Command "%s" not found. Has it been registered with the Application?', name)
            );
        }

        Command = this.commands[name];

        return new Command(this.args);
    }
}
