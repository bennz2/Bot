const Discord = require("discord.js");
const { Console } = require("console");
const db = require("quick.db");
const { MessageEmbed } = require("discord.js");

module.exports = {
  config: {
    name: "lock",
    description: "lock channel",
    aliases: [],
  },
  run: async (bot, message, args) => {
    let lockPermErr = new Discord.MessageEmbed().setTitle("**User Permission Error!**").setDescription("**Sorry, you don't have permissions to use this! ❌**");

    if (!message.channel.permissionsFor(message.member).has("ADMINISTRATOR")) return message.channel.send(lockPermErr);

    let channel = message.channel;

    try {
      message.guild.roles.cache.forEach((role) => {
        channel.createOverwrite(role, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
        });
      });
    } catch (e) {
      console.log(e);
    }

    message.channel.send(`Done | Channel Locked!`);

    let channelss = db.fetch(`modlog_${message.guild.id}`);
    if (!channelss) return;

    let embed = new MessageEmbed()
      .setColor("RED")
      .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
      .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
      .addField("**Moderation**", "**Lock Channel**")
      .addField("**Channel**", channel)
      .addField("**Moderator**", message.author.username)
      .addField("**Date**", message.createdAt.toLocaleString())
      .setFooter(message.member.displayName, message.author.displayAvatarURL())
      .setTimestamp();

    var sChannel = message.guild.channels.cache.get(channelss);
    if (!sChannel) return;
    sChannel.send(embed);
  },
};
