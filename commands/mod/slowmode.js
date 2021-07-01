const db = require("quick.db");
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  config: {
    name: "slowmode",
    description: "Set the slowmode for the channel!",
    aliases: ["sm"],
  },
  run: async (bot, message, args) => {
    if (!args[0]) return message.channel.send(`You did not specify the time in seconds you wish to set this channel's slow mode too!`);

    let channel = message.channel;

    if (isNaN(args[0])) return message.channel.send(`That is not a number!`);

    message.channel.setRateLimitPerUser(args[0]);
    message.channel.send(`Set the slowmode of this channel too **${args[0]}**`);
    let channelss = db.fetch(`modlog_${message.guild.id}`);
    if (!channelss) return;

    let embed = new MessageEmbed()
      .setColor("RED")
      .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
      .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
      .addField("**Moderation**", "**Slowmode Channel**")
      .addField("**Channel**", channel)
      .addField("**Slow Seconds**", `${args[0]}`)
      .addField("**Moderator**", message.author.username)
      .addField("**Date**", message.createdAt.toLocaleString())
      .setFooter(message.member.displayName, message.author.displayAvatarURL())
      .setTimestamp();

    var sChannel = message.guild.channels.cache.get(channelss);
    if (!sChannel) return;
    sChannel.send(embed);
  },
};
