import { join } from 'path';
import fs from 'fs';
import execa from 'execa';

export default async function init(log, dir) {
  const install = (dependencies) =>
    execa('npm', ['install', '-D', ...dependencies]);
  return new Promise(async (resolve) => {
    log('Creating Development Environment', 'green');
    log('Initiating npm', 'orange', '1/6 ');
    await execa('npm', ['init']);
    log('ESLint/Prettier Installation...', 'cyan', '2/6 ');
    await install(['eslint', 'prettier']);
    log("Conforming to Airbnb's JavaScript Style Guide...", 'yellow', '3/6 ');
    await install(['eslint-config-airbnb', 'eslint-plugin-import']);
    log(
      'Making ESlint and Prettier play nice with each other...',
      'cyan',
      '4/6 '
    );
    await install(['eslint-config-prettier', 'eslint-plugin-prettier']);
    log('Building your .eslintrc.json file...', 'yellow', '5/6 ');
    fs.writeFileSync(
      join(process.cwd(), '.eslintrc.json'),
      fs.readFileSync(`${dir}\\src\\template\\.eslintrc.json`).toString()
    );
    log('Building your .prettierrc.json file...', 'yellow', '6/6 ');
    fs.writeFileSync(
      join(process.cwd(), '.prettierrc.json'),
      fs.readFileSync(`${dir}\\src\\template\\.prettierrc.json`).toString()
    );
    log('Finished Setting Up Your Dev Environment!', 'green');
    resolve();
  });
}
