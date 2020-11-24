const { Client, Collection, MessageEmbed } = require('discord.js');

module.exports = class extends Client {
  constructor(ClientOptions) {
    super(ClientOptions);
    Object.assign(this, {
      commands: new Collection(),
      config: require('../config.json'),
      author(user) {
        return [user.username, user.displayAvatarURL({ dynamic: true })];
      },
      embed(author) {
        const embed = new MessageEmbed().setColor('GREEN');
        return author ? embed.setAuthor(...this.author(author)) : embed;
      },
      error(error, message, options) {
        const embed = new MessageEmbed()
          .setColor('GREEN')
          .setAuthor(...this.author(message.author))
          .setTitle(`:x: ${error}`);
        if (options && options.usage)
          embed.addField('Correct Usage', `\`${options.usage}\``);
        if (options && options.description)
          embed.setDescription(options.description);
        return message.channel
          .send(embed)
          .then((msg) =>
            msg.delete({ timeout: options ? options.timeout || 4000 : 4000 })
          );
      },
    });
  }
};
