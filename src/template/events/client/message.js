module.exports = (message, client) => {
  if (!message.guild || message.author.bot || !message.startsWith('prefix'))
    return;

  const [name, ...args] = message.content.slice('length').split(/ +/);
  const command = client.commands.find((_, match) =>
    new RegExp(`^${match}$`).test(name)
  );

  if (!command) return;

  try {
    command.execute(message, args, client);
  } catch (e) {
    client.error('Something went wrong!', message);
  }
};
