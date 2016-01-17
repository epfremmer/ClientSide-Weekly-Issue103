/**
 * File PrisonerCache.js
 *
 * @author Edward Pfremmer <epfremme@nerdery.com>
 * @author Kaitlin Muth <kmuth@nerdery.com>
 */

'use strict';

import fs from 'fs';
import path from 'path';

import HistoryModel from '../Model/HistoryModel';


/**
 * Cache directory path
 * @const {string|*}
 */
const CACHE_DIR = path.join(__dirname, '../../.cache');

/**
 * PrisonerCache Class
 *
 * @export
 * @class PrisonerCache
 * @package ClientSideWeekly
 */
export default class PrisonerCache {
    /**
     * Return history from the cache
     *
     * @param {string} name
     * @returns {HistoryModel}
     */
    getHistory(name) {
        let file = path.join(CACHE_DIR, name);
        let json = fs.existsSync(file) ? fs.readFileSync(file) : null;

        return new HistoryModel(json);
    }

    /**
     * Store serialized history in the cache
     *
     * @param {string} name
     * @param {HistoryModel} history
     * @returns {string|*}
     */
    setHistory(name, history) {
        return fs.writeFileSync(path.join(CACHE_DIR, name), history.toJSON());
    }
}
