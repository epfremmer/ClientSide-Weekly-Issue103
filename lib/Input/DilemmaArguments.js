/**
 * File DilemmaArguments.js
 *
 * @author Edward Pfremmer <epfremme@nerdery.com>
 * @author Kaitlin Muth <kmuth@nerdery.com>
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parse = parse;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _argparse = require('argparse');

var _ResponseModel = require('../Model/ResponseModel');

var _ResponseModel2 = _interopRequireDefault(_ResponseModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Parser = new _argparse.ArgumentParser({
    version: '1.0.0',
    addHelp: true,
    description: 'Prisoner\'s Dilemma'
});

Parser.addArgument(['partnerName'], {
    help: 'This is the name of the opponent or the player who was your partner in crime.'
});

Parser.addArgument(['partnerDiscipline'], {
    choices: ['client-side', 'jvm', 'mobile', '.net', 'php', 'ruby'],
    help: 'This is the discipline of your opponent. It will be one of the following: ' + '[client-side, jvm, mobile, .net, php, ruby]'
});

Parser.addArgument(['partnerPreviousResponse'], {
    nargs: '?',
    choices: [_ResponseModel2.default.SILENT, _ResponseModel2.default.CONFESS],
    help: 'This is the response of your opponent from your previous match with that opponent. Is one of ' + '“confess” or “silent”. This will not be provided in your first match with this opponent.'
});

Parser.addArgument(['playerPreviousResponse'], {
    nargs: '?',
    choices: [_ResponseModel2.default.SILENT, _ResponseModel2.default.CONFESS],
    help: 'This is your response from the previous match with this opponent. Is one of “confess” or “silent”. ' + 'This will not be provided in your first match with this opponent.'
});

/**
 * DilemmaArguments
 *
 * @export
 * @type {function} parse
 * @throws {Error}
 * @package ClientSideWeekly
 */
function parse(argv) {
    if (!argv) {
        throw new Error('no arguments to parse');
    }

    return Parser.parseArgs(argv.slice(2));
};