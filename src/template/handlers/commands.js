exports.init = ({ commands }) =>
  require('fs')
    .readdirSync('./commands')
    .forEach((file) => {
      const command = require(`./commands/${file}`);
      commands.set(command.match, command);
    });
