module.exports = {
  match: 'ping',
  execute(message, _, client) {
    message.channel.send(
      client
        .embed(message.author)
        .setTitle(
          `🏓Latency is ${
            Date.now() - message.createdTimestamp
          }ms. API Latency is ${Math.round(client.ws.ping)}ms`
        )
    );
  },
};
