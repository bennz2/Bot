const Discord = require("discord.js");

module.exports = {
  config: {
    name: "support",
    description: "support",
    usage: "suppport server",
    aliases: ["sup"],
  },
  run: async (bot, message, args) => {
    bot.api.channels(message.channel.id).messages.post({
      data: {
        components: [
          {
            type: 1,
            components: [
              {
                type: 2,
                label: "💾 Support Server",
                style: 5,
                url: "https://discord.io/AjdsCommunity",
              },
            ],
          },
        ],
        content: "**Do You Need Support ? Click This**",
      },
    });
  },
};
