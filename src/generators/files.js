import ora from 'ora';
import fs from 'fs';
import { join } from 'path';

const color = () =>
  [
    'black',
    'red',
    'green',
    'yellow',
    'blue',
    'magenta',
    'cyan',
    'white',
    'gray',
  ][~~(Math.random * 9)];

export default async function init(log, text, dir) {
  return new Promise((resolve) => {
    log('Importing Files...', 'green');
    const spinner = ora(text('Importing Files...', 'green')).start();
    const iterate = (child, folder) => {
      const randomColor = color();
      const path = (folder ? `${folder}/` : '') + child;
      if (!child.includes('.')) {
        if (!fs.existsSync(join(process.cwd(), path)))
          fs.mkdirSync(join(process.cwd(), path));
        return fs
          .readdirSync(`${dir}\\src\\template\\${path}`)
          .forEach((file) => iterate(file, path));
      }
      spinner.text = text(`Importing ${path}`, randomColor);
      spinner.color = randomColor;
      fs.writeFileSync(
        join(process.cwd(), path),
        fs.readFileSync(`${dir}\\src\\template\\${path}`).toString()
      );
    };
    fs.readdirSync(`${dir}\\src\\template`)
      .filter((file) => !file.includes('rc'))
      .forEach((child) => iterate(child));
    spinner.stop();
    log('Files Imported!', 'green');
    resolve();
  });
}
