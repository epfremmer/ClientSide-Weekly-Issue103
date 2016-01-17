/**
 * File DilemmaCommand.js
 *
 * @author Edward Pfremmer <epfremme@nerdery.com>
 * @author Kaitlin Muth <kmuth@nerdery.com>
 */

'use strict';

import ResponseModel from '../Model/ResponseModel';
import PrisonerCache from '../Cache/PrisonerCache';
import ResponseProvider from '../Provider/ResponseProvider';
import * as DilemmaArguments from '../Input/DilemmaArguments';

/**
 * @const {string}
 */
const MY_NAME = 'epfremme_dba_kmuth';

/**
 * DilemmaCommand Class
 *
 * @export
 * @class DilemmaCommand
 * @package ClientSideWeekly
 */
export default class DilemmaCommand {
    /**
     * @static
     * @const {string}
     */
    static NAME = 'dilemma';
    /**
     * @static
     * @const {string}
     */
    static MY_NAME = MY_NAME;

    /**
     * DilemmaCommand Constructor
     *
     * @constructor
     * @param {array} args
     */
    constructor(args) {
        this.args = this._parseArgs(args);
        this.cache = new PrisonerCache();
        this.provider = new ResponseProvider();
    }

    /**
     * Return command result
     *
     * @returns {*}
     */
    getResult() {
        let history = this.cache.getHistory(this.args.partnerName);

        if (history.count === 99) return ResponseModel.CONFESS;
        if (!this.args.partnerPreviousResponse) return ResponseModel.SILENT;

        history.add(new ResponseModel(this.args.partnerPreviousResponse));

        this.cache.setHistory(this.args.partnerName, history);

        return this.provider.getResponse(history).toString();
    }

    /**
     * Parse command arguments
     *
     * @private
     * @param {array} args
     * @returns {Namespace}
     */
    _parseArgs(args) {
        return DilemmaArguments.parse(args);
    }
}
