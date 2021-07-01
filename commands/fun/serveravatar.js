const discord = require("discord.js");

module.exports = {
  config: {
    name: "serveravatar",
    aliases: ["iconserver"],
    category: "fun",
    description: "Use This Command To Show Icon Server",
    usage: "?serveravatar",
  },

  run: async (client, message, args) => {
    let embed = new discord.MessageEmbed();

    embed.setDescription(`[Download](${message.guild.iconURL({ dynamic: true, size: 1024 })})`);
    embed.setImage(message.guild.iconURL({ dynamic: true, size: 1024 }));
    embed.setColor("RANDOM");

    message.channel.send(embed);
  },
};
