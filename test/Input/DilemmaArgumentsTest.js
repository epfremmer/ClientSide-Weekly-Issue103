/**
 * File DilemmaArgumentsTest.js
 *
 * @author Edward Pfremmer <epfremme@nerdery.com>
 * @author Kaitlin Muth <kmuth@nerdery.com>
 */

'use strict';

import { assert } from 'chai';

import * as DilemmaArguments from '../../src/Input/DilemmaArguments';

describe('DilemmaArguments', () => {
    describe('parse', () => {
        it('should return parsed process arguments', () => {
            let parsedArgs = DilemmaArguments.parse([
                'some/execution/context',
                'path/to/executable',
                'epfremme',
                'php'
            ]);

            assert.equal('epfremme', parsedArgs.partnerName);
            assert.equal('php', parsedArgs.partnerDiscipline);
            assert.isNull(parsedArgs.partnerPreviousResponse);
            assert.isNull(parsedArgs.playerPreviousResponse);
        });
        it('should return parsed process arguments with optional arguments', () => {
            let parsedArgs = DilemmaArguments.parse([
                'some/execution/context',
                'path/to/executable',
                'epfremme',
                'php',
                'silent',
                'confess'
            ]);

            assert.equal('epfremme', parsedArgs.partnerName);
            assert.equal('php', parsedArgs.partnerDiscipline);
            assert.equal('silent', parsedArgs.partnerPreviousResponse);
            assert.equal('confess', parsedArgs.playerPreviousResponse);
        });
        it('should throw error if no arguments given', () => {
            assert.throw(() => {
                DilemmaArguments.parse();
            });
        });
    });
});
