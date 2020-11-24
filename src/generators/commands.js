import fs from 'fs';
import { join } from 'path';

export default function init(log, name, match) {
  if (!fs.existsSync(join(process.cwd(), 'commands/')))
    return log("You don't have a commands file!", 'red');
  fs.writeFileSync(
    join(process.cwd(), `commands/${name}.js`),
    `module.exports = {\n  match: '${match}',\n  execute(message, args, client) {\n    \n  },\n}`
  );
}
