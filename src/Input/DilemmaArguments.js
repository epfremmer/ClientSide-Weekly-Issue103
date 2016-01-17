/**
 * File DilemmaArguments.js
 *
 * @author Edward Pfremmer <epfremme@nerdery.com>
 * @author Kaitlin Muth <kmuth@nerdery.com>
 */

'use strict';

import _ from 'lodash';
import { ArgumentParser } from 'argparse';

import ResponseModel from '../Model/ResponseModel';

let Parser = new ArgumentParser({
    version: '1.0.0',
    addHelp: true,
    description: 'Prisoner\'s Dilemma'
});

Parser.addArgument(['partnerName'], {
    help: 'This is the name of the opponent or the player who was your partner in crime.'
});

Parser.addArgument(['partnerDiscipline'], {
    choices: ['client-side', 'jvm', 'mobile', '.net', 'php', 'ruby'],
    help: 'This is the discipline of your opponent. It will be one of the following: '
    + '[client-side, jvm, mobile, .net, php, ruby]'
});

Parser.addArgument(['partnerPreviousResponse'], {
    nargs: '?',
    choices: [ResponseModel.SILENT, ResponseModel.CONFESS],
    help: 'This is the response of your opponent from your previous match with that opponent. Is one of '
    + '“confess” or “silent”. This will not be provided in your first match with this opponent.'
});

Parser.addArgument(['playerPreviousResponse'], {
    nargs: '?',
    choices: [ResponseModel.SILENT, ResponseModel.CONFESS],
    help: 'This is your response from the previous match with this opponent. Is one of “confess” or “silent”. '
    + 'This will not be provided in your first match with this opponent.'
});

/**
 * DilemmaArguments
 *
 * @export
 * @type {function} parse
 * @throws {Error}
 * @package ClientSideWeekly
 */
export function parse(argv) {
    if (!argv) {
        throw new Error('no arguments to parse');
    }

    return Parser.parseArgs(argv.slice(2));
};
