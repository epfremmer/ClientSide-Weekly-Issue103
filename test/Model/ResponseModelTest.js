/**
 * File ResponseModelTest.js
 *
 * @author Edward Pfremmer <epfremme@nerdery.com>
 * @author Kaitlin Muth <kmuth@nerdery.com>
 */

'use strict';

import { assert } from 'chai';

import ResponseModel from '../../src/Model/ResponseModel';

describe('ResponseModel', () => {
    describe('construct', () => {
        it('should set response value for the model', () => {
            assert.equal(ResponseModel.SILENT, new ResponseModel(ResponseModel.SILENT).value);
        });
        it('should default to silent on construct', () => {
            assert.equal(ResponseModel.SILENT, new ResponseModel().value);
        });
        it('should throw error on invalid response values', () => {
            assert.throw(() => new ResponseModel('invalid_response'));
        });
    });

    describe('isConfess', () => {
        it('should return false if value not equal to CONFESS', () => {
            assert.isFalse(new ResponseModel(ResponseModel.SILENT).isConfess());
        });
        it('should return true if value equal to CONFESS', () => {
            assert.isTrue(new ResponseModel(ResponseModel.CONFESS).isConfess());
        });
    });

    describe('isSilent', () => {
        it('should return false if value not equal to SILENT', () => {
            assert.isFalse(false, new ResponseModel(ResponseModel.CONFESS).isSilent());
        });
        it('should return true if value equal to SILENT', () => {
            assert.isTrue(true, new ResponseModel(ResponseModel.SILENT).isSilent());
        });
    });

    describe('setValue', () => {
        it('should set response value for the model', () => {
            let response = new ResponseModel(ResponseModel.CONFESS);

            response.setValue(ResponseModel.SILENT);
            assert.equal(ResponseModel.SILENT, response.value);
        });
        it('should default to silent', () => {
            let response = new ResponseModel(ResponseModel.CONFESS);

            response.setValue();
            assert.equal(ResponseModel.SILENT, response.value);
        });
        it('should throw error on invalid response values', () => {
            let response = new ResponseModel(ResponseModel.CONFESS);

            assert.throw(() => response.setValue('invalid_response'));
        });
    });

    describe('toString', () => {
        it('should return response value as string', () => {
            let response = new ResponseModel(ResponseModel.CONFESS);

            assert.equal(ResponseModel.CONFESS, response.toString());
        });
    });
});
