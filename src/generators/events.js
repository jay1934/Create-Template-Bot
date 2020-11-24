import fs from 'fs';
import events from '../data/events.json';
import { join } from 'path';

export default function init(log, eventName) {
  const [name, event] = Object.entries(events).find(
    ([name]) => name.toLowerCase() === eventName
  );
  if (!event) return log('That is not a valid client event name!', 'red');
  if (!fs.existsSync(join(process.cwd(), 'events/client')))
    return log("You don't have a `commands/client` folder!", 'red');
  fs.writeFileSync(
    join(process.cwd(), `events/client/${name}.js`),
    `module.exports = (${event.args.join(', ')}) =>\n  console.log(\`${
      event.message
    }\`)`
  );
  log('The file has been made!', 'green');
}
