const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports = {
  config: {
    name: "facepalm",
    aliases: [],
    description: "Creates facepalm image",
    category: "Image",
    usage: "facepalm [user mention, user id, user name]",
  },
  run: async (bot, message, args) => {
    try {
      const User =
        (await message.mentions.members.first()) ||
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) ||
        message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) ||
        message.member;
      const wait = await message.lineReply({
        embed: {
          color: 4779354,
          description: "✨ | Please wait... I'm Generate Your Image",
        },
      });
      const facepalm = await canvacord.Canvas.facepalm(
        User.user.displayAvatarURL({
          dynamic: false,
          format: "png",
          size: 2048,
        })
      );
      const attachment = new Discord.MessageAttachment(facepalm, "facepalm.png");
      return message.channel.send(attachment);
    } catch (err) {
      console.log(err);
      message.lineReply({
        embed: {
          color: 16734039,
          description: "Something went wrong... :cry:",
        },
      });
    }
  },
};