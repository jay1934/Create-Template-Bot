import inquirer from 'inquirer';
import chalk from 'chalk';
import airbnb from './generators/airbnb';
import files from './generators/files';
import git from './generators/git';
import events from './generators/events';
import commands from './generators/commands';
import { dirname } from 'path';

async function create(options) {
  const text = (message, color) => chalk.bold[color](message);
  const log = (message, color, excluded) => {
    console.log((excluded || '') + color ? text(message, color) : message);
    console.log();
  };
  console.log(options.component);
  if (options.component === 'bot') {
    const confirmation = (
      await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message:
            'Are you sure you want to create a new bot template? This will overwrite existing files.',
        },
      ])
    ).confirm;
    if (!confirmation) return log('Setup Canceled', 'red');
    await airbnb(log, dirname(__dirname));
    await git(log, dirname(__dirname));
    await files(log, text, dirname(__dirname));
  } else if (options.component === 'event')
    events(
      log,
      options.name ||
        (
          await inquirer.prompt([
            {
              name: 'name',
              message: 'What event would you like to start listening to?',
            },
          ])
        ).name.toLowerCase()
    );
  else if (options.component === 'command') {
    if (options.match) {
      try {
        new RegExp(`^${options.match}$`);
      } catch (e) {
        return log('The RegExp you provided is not valid!', 'red');
      }
    }
    commands(
      log,
      options.name ||
        (
          await inquirer.prompt([
            {
              name: 'name',
              message: 'What would you like to name the new command?',
            },
          ])
        ).name,
      options.match ||
        (
          await inquirer.prompt([
            {
              name: 'match',
              message: 'Please provide a valid RegExp pattern',
              validate: (regex) => {
                try {
                  new RegExp(`^${regex}$`);
                  return true;
                } catch (e) {
                  return 'That is not a valid RegExp!';
                }
              },
            },
          ])
        ).match
    );
  }
}

export async function cli(args) {
  const options = {
    component: (args[0] || '').toLowerCase(),
    name: (args[1] || '').toLowerCase(),
    match: args[2],
  };
  create({
    ...options,
    component: ['command', 'event', 'bot'].includes(options.component)
      ? options.component
      : (
          await inquirer.prompt([
            {
              type: 'list',
              name: 'component',
              message: 'What would you like to create?',
              choices: ['command', 'event', 'bot'],
            },
          ])
        ).component,
  });
}
