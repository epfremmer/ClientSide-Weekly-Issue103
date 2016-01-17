/**
 * File HistoryModel.js
 *
 * @author Edward Pfremmer <epfremme@nerdery.com>
 * @author Kaitlin Muth <kmuth@nerdery.com>
 */

'use strict';

import _ from 'lodash';
import sprintf from 'sprintf';

import ResponseModel from './ResponseModel';

/**
 * Default serialized history
 * @const {string}
 */
const DEFAULT_JSON = '{"count":0,"silent":0,"confess":0}';

/**
 * HistoryModel Class
 *
 * @export
 * @class HistoryModel
 * @package ClientSideWeekly
 */
export default class HistoryModel {
    /**
     * HistoryModel Constructor
     *
     * @constructor
     * @param {string|undefined} jsonOrUndefined
     */
    constructor(jsonOrUndefined) {
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
    toJSON() {
        return JSON.stringify(_.create({}, this));
    }

    /**
     * Hydrate history data from JSON
     *
     * @param {string} json
     */
    fromJSON(json = DEFAULT_JSON) {
        let data = JSON.parse(json);

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
    add(response) {
        if (!(response instanceof ResponseModel)) {
            throw new Error(sprintf('Expected response model. Got "%s"', typeof response));
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
    getConfessions() {
        return this.confess;
    }

    /**
     * Return silence count
     *
     * @returns {number|*}
     */
    getSilences() {
        return this.silent;
    }
}
