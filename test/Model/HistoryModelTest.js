/**
 * File HistoryModelTest.js
 *
 * @author Edward Pfremmer <epfremme@nerdery.com>
 * @author Kaitlin Muth <kmuth@nerdery.com>
 */

'use strict';

import { assert } from 'chai';
import { describe, it } from 'mocha';

import HistoryModel from '../../src/Model/HistoryModel';
import ResponseModel from '../../src/Model/ResponseModel';

describe('HistoryModel', () => {
    describe('construct', () => {
        it('should return new empty history model', () => {
            assert.equal(0, new HistoryModel().count);
            assert.equal(0, new HistoryModel().silent);
            assert.equal(0, new HistoryModel().confess);
        });
        it('should return new hydrated history model', () => {
            let json = JSON.stringify({ count: 5, silent: 2, confess: 3 });

            assert.equal(5, new HistoryModel(json).count);
            assert.equal(2, new HistoryModel(json).silent);
            assert.equal(3, new HistoryModel(json).confess);
        });
    });

    describe('toJSON', () => {
        it('should return serialized history model', () => {
            let json = JSON.stringify({ count: 5, silent: 2, confess: 3 });

            assert.equal('{"count":5,"silent":2,"confess":3}', new HistoryModel(json).toJSON());
        });
    });

    describe('fromJSON', () => {
        it('should hydrate history model', () => {
            let json = JSON.stringify({ count: 5, silent: 2, confess: 3 });
            let history = new HistoryModel();

            history.fromJSON(json);

            assert.equal(5, history.count);
            assert.equal(2, history.silent);
            assert.equal(3, history.confess);
        });
        it('should hydrate empty hostory by default', () => {
            let history = new HistoryModel();

            history.fromJSON();

            assert.equal(0, history.count);
            assert.equal(0, history.silent);
            assert.equal(0, history.confess);
        });
    });

    describe('add', () => {
        it('should add confess response to history model', () => {
            let history = new HistoryModel();
            let response = new ResponseModel(ResponseModel.CONFESS);

            assert.equal(0, history.count);
            history.add(response);

            assert.equal(1, history.count);
            assert.equal(0, history.silent);
            assert.equal(1, history.confess);
        });
        it('should add silent response to history model', () => {
            let history = new HistoryModel();
            let response = new ResponseModel(ResponseModel.SILENT);

            assert.equal(0, history.count);
            history.add(response);

            assert.equal(1, history.count);
            assert.equal(1, history.silent);
            assert.equal(0, history.confess);
        });
        it('should throw error on invalid response', () => {
            assert.throw(() => new HistoryModel().add());
        });
    });

    describe('getConfessions', () => {
        it('should return confession count', () => {
            let json = JSON.stringify({count: 5, silent: 2, confess: 3});

            assert.equal(3, new HistoryModel(json).getConfessions());
        });
    });

    describe('getSilences', () => {
        it('should return silence count', () => {
            let json = JSON.stringify({count: 5, silent: 2, confess: 3});

            assert.equal(2, new HistoryModel(json).getSilences());
        });
    });
});
