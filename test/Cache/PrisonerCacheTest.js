/**
 * File PrisonerCacheTest.js
 *
 * @author Edward Pfremmer <epfremme@nerdery.com>
 * @author Kaitlin Muth <kmuth@nerdery.com>
 */

'use strict';

import fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import sinon from 'sinon';

import PrisonerCache from '../../src/Cache/PrisonerCache';
import HistoryModel from '../../src/Model/HistoryModel';

/**
 * History cache directory
 * @const {string|*}
 */
const CACHE_DIR = path.join(__dirname, '../../.cache');

describe('PrisonerCache', () => {
    let sandbox;

    beforeEach((done) => {
        sandbox = sinon.sandbox.create();
        done();
    });

    afterEach((done) => {
        sandbox.restore();
        done();
    });

    describe('construct', () => {
        it('should return new prisoner cache', () => {
            assert.instanceOf(new PrisonerCache(), PrisonerCache);
        });
    });
    describe('getHistory', () => {
        it('should return an empty prisoner response history model', () => {
            let stub = sandbox.stub(fs, 'existsSync', () => false);
            let history = new PrisonerCache().getHistory('epfremme');

            assert.isTrue(stub.calledOnce);
            assert.equal(path.join(CACHE_DIR, 'epfremme'), stub.firstCall.args[0]);

            assert.instanceOf(history, HistoryModel);
            assert.equal(0, history.count);
            assert.equal(0, history.silent);
            assert.equal(0, history.confess);
        });
        it('should return a prisoner response history model', () => {
            let existsStub = sandbox.stub(fs, 'existsSync', () => true);
            let readStub = sandbox.stub(fs, 'readFileSync', () => JSON.stringify({ count: 5, silent: 2, confess: 3 }));
            let history = new PrisonerCache().getHistory('epfremme');

            assert.isTrue(readStub.calledOnce);
            assert.isTrue(existsStub.calledOnce);

            assert.equal(path.join(CACHE_DIR, 'epfremme'), readStub.firstCall.args[0]);
            assert.equal(path.join(CACHE_DIR, 'epfremme'), existsStub.firstCall.args[0]);

            assert.instanceOf(history, HistoryModel);
            assert.equal(5, history.count);
            assert.equal(2, history.silent);
            assert.equal(3, history.confess);
        });
    });
    describe('setHistory', () => {
        it('should store an existing prisoner response history model', () => {
            let stub = sandbox.stub(fs, 'writeFileSync', () => true);
            let history = new HistoryModel(JSON.stringify({ count: 5, silent: 3, confess: 2 }));
            let result = new PrisonerCache().setHistory('epfremme', history);

            assert.isTrue(result);
            assert.isTrue(stub.calledOnce);

            assert.equal(path.join(CACHE_DIR, 'epfremme'), stub.firstCall.args[0]);
        });
    });
});
