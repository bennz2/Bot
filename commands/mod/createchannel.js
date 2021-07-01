const Discord = require("discord.js");
const db = require("quick.db");
const { MessageEmbed } = require("discord.js");

module.exports = {
  config: {
    name: "createchannel",
    aliases: ["cch"],
    description: "Create channel easily with commands",
  },
  run: async (bot, message, args) => {
    const notice3 = new Discord.MessageEmbed().setDescription(":x: **I don't have permission to manage channel!**").setColor("RED");
    if (!message.guild.member(bot.user).hasPermission("MANAGE_CHANNELS")) {
      return message.channel.send(notice3).then((msg) => msg.delete({ timeout: 5000 }));
    }
    try {
      const embed6 = new Discord.MessageEmbed().setDescription(`:no_entry_sign: ${message.author.username}, Missing Permission`).setColor("RED");
      if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(embed6).then((msg) => msg.delete(5000));
      if (!args[1]) return message.reply("You need to input the channel type!");
      if (!args[0]) return message.reply("You need to input the channel name!");

      message.channel.send("I've created the channel!").then(() => {
        message.guild.channels.create(args[1], args[0], []).catch((err) => {
          message.channel.send("There was an error!");
        });
      });
      let channelss = db.fetch(`modlog_${message.guild.id}`);
      if (!channelss) return;

      let embed = new MessageEmbed()
        .setColor("RED")
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
        .addField("**Moderation**", "**Create Channel**")
        .addField("**Channel Name**", `${args[1]}`)
        .addField("**Moderator**", message.author.username)
        .addField("**Date**", message.createdAt.toLocaleString())
        .setFooter(message.member.displayName, message.author.displayAvatarURL())
        .setTimestamp();

      var sChannel = message.guild.channels.cache.get(channelss);
      if (!sChannel) return;
      sChannel.send(embed);
    } catch (err) {
      message.channel.send(`There was an error!\n${err}`).catch();
    }
  },
};
