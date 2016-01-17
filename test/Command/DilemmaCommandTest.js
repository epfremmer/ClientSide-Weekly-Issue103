/**
 * File DilemmaCommandTest.js
 *
 * @author Edward Pfremmer <epfremme@nerdery.com>
 * @author Kaitlin Muth <kmuth@nerdery.com>
 */

'use strict';

import { assert } from 'chai';
import { Namespace } from 'argparse';
import sinon from 'sinon';

import DilemmaCommand from '../../src/Command/DilemmaCommand';
import PrisonerCache from '../../src/Cache/PrisonerCache';
import ResponseProvider from '../../src/Provider/ResponseProvider';
import ResponseModel from '../../src/Model/ResponseModel';
import HistoryModel from '../../src/Model/HistoryModel';

describe('DilemmaCommand', () => {
    describe('construct', () => {
        it('should return new dilemma command', () => {
            let args = [
                'some/execution/context',
                'path/to/executable',
                'epfremme',
                'php'
            ];

            let command = new DilemmaCommand(args);

            assert.instanceOf(command, DilemmaCommand);
            assert.instanceOf(command.cache, PrisonerCache);
            assert.instanceOf(command.provider, ResponseProvider);
            assert.instanceOf(command.args, Namespace);
        });
    });
    describe('getResult', () => {
        it('should return silent response if no previous partner response provided', () => {
            let command = new DilemmaCommand([
                'some/execution/context',
                'path/to/executable',
                'epfremme',
                'php'
            ]);

            let mock = sinon.mock(command.cache);
            let history = new HistoryModel();

            mock.expects('getHistory').once().withArgs('epfremme').returns(history);
            mock.expects('setHistory').once().withArgs('epfremme', history).returns(true);

            assert.equal(ResponseModel.SILENT, command.getResult());
        });
        it('should return command confess response if this is the 100th response', () => {
            let command = new DilemmaCommand([
                'some/execution/context',
                'path/to/executable',
                'epfremme',
                'php',
                ResponseModel.CONFESS,
                ResponseModel.CONFESS
            ]);

            let mock = sinon.mock(command.cache);
            let history = new HistoryModel(JSON.stringify({
                count: 99,
                silent: 99,
                confess: 0
            }));

            mock.expects('getHistory').once().withArgs('epfremme').returns(history);
            mock.expects('setHistory').once().withArgs('epfremme', history).returns(true);

            assert.equal(ResponseModel.CONFESS, command.getResult());
        });
        it('should return command results from historical responses', () => {
            let command = new DilemmaCommand([
                'some/execution/context',
                'path/to/executable',
                'epfremme',
                'php',
                ResponseModel.CONFESS,
                ResponseModel.CONFESS
            ]);

            let mock = sinon.mock(command.cache);
            let history = new HistoryModel(JSON.stringify({
                count: 1000000,
                silent: 0,
                confess: 1000000
            }));

            mock.expects('getHistory').once().withArgs('epfremme').returns(history);
            mock.expects('setHistory').once().withArgs('epfremme', history).returns(true);

            assert.equal(ResponseModel.CONFESS, command.getResult());
        });
    });
});
