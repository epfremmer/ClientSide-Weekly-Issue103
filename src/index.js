/**
 * File index.js
 *
 * @author Edward Pfremmer <epfremme@nerdery.com>
 * @author Kaitlin Muth <kmuth@nerdery.com>
 */

'use strict';

import Application from '../lib/Application';
import DilemmaCommand from '../lib/Command/DilemmaCommand';

let application = new Application(process.argv);

application.register(DilemmaCommand);

export default application.run();
