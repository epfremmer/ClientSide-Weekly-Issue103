/**
 * File index.js
 *
 * @author Edward Pfremmer <epfremme@nerdery.com>
 * @author Kaitlin Muth <kmuth@nerdery.com>
 */

'use strict';

/**
 * General application entry point
 *
 * usage: index.js [COMMAND_NAME] [arguments]
 *
 * Optional arguments:
 *   -h, --help            Show this help message and exit.
 *   -v, --version         Show program's version number and exit.
 */

var result = require('./lib/index').default;

console.log(result);
