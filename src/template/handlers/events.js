exports.init = (client) =>
  ['client', 'process'].forEach((emitter) =>
    require('fs')
      .readdirSync(`./events/${emitter}`)
      .forEach((file) =>
        ({
          client,
          process,
        }[emitter].on(
          file.split('.')[0],
          require(`./events/${emitter}/${file}`)
        ))
      )
  );
