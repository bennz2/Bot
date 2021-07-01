const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  config: {
    name: "nuke",
    aliases: ["nuked"],
  },
  run: async (bot, message, args) => {
    let channel = message.channel;

    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
      return message.channel.send("You Don't Have Permission To Use This Commands!");
    }
    message.channel.clone().then((ch) => {
      ch.setParent(message.channel.parent);
      ch.setPosition(message.channel.position);
      message.channel.delete().then(() => {
        ch.send("**Channel Has Been Nuked** \n https://imgur.com/LIyGeCR").then((r) => r.delete({ timeout: 5000 }));
      });
    });
    let channelss = db.fetch(`modlog_${message.guild.id}`);
    if (!channelss) return;

    let embed = new MessageEmbed()
      .setColor("RED")
      .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
      .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
      .addField("**Moderation**", "**Nuke Channel**")
      .addField("**Channel**", ch)
      .addField("**Moderator**", message.author.username)
      .addField("**Date**", message.createdAt.toLocaleString())
      .setFooter(message.member.displayName, message.author.displayAvatarURL())
      .setTimestamp();

    var sChannel = message.guild.channels.cache.get(channelss);
    if (!sChannel) return;
    sChannel.send(embed);
  },
};
