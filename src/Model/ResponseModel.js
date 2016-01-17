/**
 * File ResponseModel.js
 *
 * @author Edward Pfremmer <epfremme@nerdery.com>
 * @author Kaitlin Muth <kmuth@nerdery.com>
 */

'use strict';

import sprintf from 'sprintf';

/** @const {string} */
const SILENT = 'silent';
/** @const {string} */
const CONFESS = 'confess';

/**
 * ResponseModel Class
 *
 * @export
 * @class ResponseModel
 * @package ClientSideWeekly
 */
export default class ResponseModel {
    /**
     * @static
     * @const {string}
     */
    static SILENT = SILENT;
    /**
     * @static
     * @const {string}
     */
    static CONFESS = CONFESS;

    /**
     * ResponseModel Constructor
     *
     * @param {string} response (defaults to silent)
     */
    constructor(response = SILENT) {
        this.setValue(response);
    }

    /**
     * Test if confess response
     *
     * @returns {boolean}
     */
    isConfess() {
        return this.value === CONFESS;
    }

    /**
     * Test if silent response
     *
     * @returns {boolean}
     */
    isSilent() {
        return this.value === SILENT;
    }

    /**
     * Set response value
     *
     * @param {string} response
     */
    setValue(response = SILENT) {
        if (response !== SILENT && response !== CONFESS) {
            throw new Error(sprintf('Invalid response provided. Got "%s"', response));
        }

        this.value = response;
    }

    /**
     * Return response as string
     *
     * @returns {string}
     */
    toString() {
        return this.value;
    }
}
