/**
 * File MockCommand.js
 *
 * @author Edward Pfremmer <epfremme@nerdery.com>
 * @author Kaitlin Muth <kmuth@nerdery.com>
 */

'use strict';

/**
 * MockCommand Class
 *
 * @export
 * @class MockCommand
 * @package ClientSideWeekly
 */
export default class MockCommand {
    /**
     * @static
     * @const {string}
     */
    static NAME = 'mock-command';

    /**
     * Return mock response
     * @returns {string}
     */
    getResult() {
        return 'mock command response';
    }
}
