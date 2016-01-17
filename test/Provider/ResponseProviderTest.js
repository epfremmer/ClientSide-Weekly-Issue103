/**
 * File ResponseProviderTest.js
 *
 * @author Edward Pfremmer <epfremme@nerdery.com>
 * @author Kaitlin Muth <kmuth@nerdery.com>
 */

'use strict';

import { assert } from 'chai';

import HistoryModel from '../../src/Model/HistoryModel';
import ResponseModel from '../../src/Model/ResponseModel';
import ResponseProvider from'../../src/Provider/ResponseProvider';

describe('ResponseProvider', () => {
    describe('construct', () => {
        assert.instanceOf(new ResponseProvider(), ResponseProvider);
    });

    describe('getResponse', () => {
        it('should return a response', () => {
            let history = new HistoryModel('{"count":3,"silent":3,"confess":0}');
            let response = new ResponseProvider().getResponse(history);

            assert.instanceOf(response, ResponseModel);
        });
        it('should return a silent response on majority silent history', () => {
            let history = new HistoryModel('{"count":1000000,"silent":1000000,"confess":0}');

            assert.equal(ResponseModel.SILENT, new ResponseProvider().getResponse(history));
        });
        it('should return a confess response on majority confess history', () => {
            let history = new HistoryModel('{"count":1000000,"silent":0,"confess":1000000}');

            assert.equal(ResponseModel.CONFESS, new ResponseProvider().getResponse(history));
        });
        it('should throw an error on invalid history', () => {
            assert.throw(() => new ResponseProvider().getResponse());
        });
    });

    describe('_getRevengeCoefficient', () => {
        it('should return revenge coefficient value from history', () => {
            let history = new HistoryModel('{"count":1000000,"silent":0,"confess":1000000}');
            let provider = new ResponseProvider();

            assert.typeOf(provider._getRevengeCoefficient(history), 'number');
            assert.equal(1000001, provider._getRevengeCoefficient(history));
        });
        it('should return revenge coefficient value of 0 from equal responses', () => {
            let history = new HistoryModel('{"count":0,"silent":1,"confess":1}');
            let provider = new ResponseProvider();

            assert.equal(0, provider._getRevengeCoefficient(history));
        });
        it('should return revenge coefficient value of 0 from more silences', () => {
            let history = new HistoryModel('{"count":0,"silent":1,"confess":0}');
            let provider = new ResponseProvider();

            assert.equal(0, provider._getRevengeCoefficient(history));
        });
        it('should return min revenge coefficient value of 2 from more confessions', () => {
            let history = new HistoryModel('{"count":0,"silent":0,"confess":1}');
            let provider = new ResponseProvider();

            assert.equal(2, provider._getRevengeCoefficient(history));
        });
    });
});
