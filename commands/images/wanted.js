const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports = {
  config: {
    name: "wanted",
    aliases: [],
    description: "Creates wanted card",
    category: "Image",
    usage: "wanted [user mention, user id, user name]",
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
      const wanted = await canvacord.Canvas.wanted(
        User.user.displayAvatarURL({
          dynamic: false,
          format: "png",
          size: 2048,
        })
      );
      const attachment = new Discord.MessageAttachment(wanted, "wanted.png");
      message.lineReply(attachment);
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
