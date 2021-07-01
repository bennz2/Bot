const db = require("quick.db");
const { MessageEmbed } = require("discord.js");
const { PREFIX } = require("../../config");
const ms = require("pretty-ms");

module.exports = {
  config: {
    name: "ping",
    description: "Know Your Ping",
    usage: "ping",
    example: "ping",
    aliases: ["prefix"],
  },

  run: async (bot, message, args) => {
    let Member = message.mentions.users.first() || message.guild.member(args[0]) || message.author;
    let bicon = Member.displayAvatarURL({ dynamic: true }); //bot avatar
    let botembed = new MessageEmbed()
      .setThumbnail(bicon)
      .addField("**Ping**", `${Date.now() - message.createdTimestamp}`, true)
      .addField("**ms. API Latency is**", `${Math.round(bot.ws.ping)}ms`, true)
      .setTimestamp()
      .setFooter(`This command requested by ${message.author.username}#${message.author.discriminator}`);

    message.channel.send(botembed);
  },
};
