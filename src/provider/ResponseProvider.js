/**
 * File ResponseProvider.js
 *
 * @author Edward Pfremmer <epfremme@nerdery.com>
 * @author Kaitlin Muth <kmuth@nerdery.com>
 */

'use strict';

import sprintf from 'sprintf';

import HistoryModel from '../Model/HistoryModel';
import ResponseModel from '../Model/ResponseModel';

/**
 * ResponseProvider Class
 *
 * @export
 * @class ResponseProvider
 * @package ClientSideWeekly
 */
export default class ResponseProvider {
    /**
     * Return response based on partner response history
     *
     * @param {HistoryModel} history
     * @returns {ResponseModel}
     */
    getResponse(history) {
        if (!(history instanceof HistoryModel)) {
            throw new Error(sprintf('Expected history model. Got "%s"', typeof history));
        }

        let response = new ResponseModel(ResponseModel.SILENT);
        let value = Math.floor(Math.random() * this._getRevengeCoefficient(history))
                ? ResponseModel.CONFESS
                : ResponseModel.SILENT
            ;

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
    _getRevengeCoefficient(history) {
        let silents = history.getSilences();
        let confessions = history.getConfessions();

        return (confessions > silents) ? confessions - silents + 1 : 0;
    }
}
