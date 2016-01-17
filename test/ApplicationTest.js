/**
 * File ApplicationTest.js
 *
 * @author Edward Pfremmer <epfremme@nerdery.com>
 * @author Kaitlin Muth <kmuth@nerdery.com>
 */

'use strict';

import _ from 'lodash';
import { assert } from 'chai';
import sinon from 'sinon';

import MockCommand from './Mocks/MockCommand';
import Application from '../src/Application';

describe('Application', () => {
    describe('construct', () => {
        it('should return a new application', () => {
            assert.instanceOf(new Application(), Application);
        });
        it('should default to process args on construct', () => {
            assert.isAbove(new Application().args.length, 0);
        });
        it('should return a new application with args', () => {
            let application = new Application([
                '/path/to/node',
                '/path/to/script',
                'mock-command'
            ]);

            assert.equal('/path/to/node', application.args[0]);
            assert.equal('/path/to/script', application.args[1]);
            assert.equal('mock-command', application.command);
            assert.isUndefined(application.args[2]);
        });
    });
    describe('register', () => {
        it('should register new command with application', () => {
            let application = new Application([]);

            application.register(MockCommand);

            assert.equal(1, _.size(application.commands));
            assert.equal(MockCommand, application.commands[MockCommand.NAME]);
        });
        it('should throw error if registering invalid command type', () => {
            let application = new Application();

            assert.throw(() => application.register({}));
        });
        it('should register new command with application', () => {
            let application = new Application();
            let command = () => {};

            assert.throw(() => application.register(command));
        });
    });
    describe('run', () => {
        it('should return command response', () => {
            let application = new Application([
                '/path/to/node',
                '/path/to/script',
                'mock-command'
            ]);

            application.register(MockCommand);

            assert.equal('mock command response', application.run());
        });
        it('should throw error if command not registered', () => {
            let application = new Application([
                '/path/to/node',
                '/path/to/script',
                'missing-command'
            ]);

            assert.throw(() => application.run());
        });
    });
});
