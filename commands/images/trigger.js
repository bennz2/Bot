const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports = {
  config: {
    name: "trigger",
    description: "This command is used for generating trigger image",
    aliases: [],
  },
  run: async (bot, message, args) => {
    try {
      const User =
        (await message.mentions.members.first()) ||
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) ||
        message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) ||
        message.member;
      const wait = await message.channel.send({
        embed: {
          color: 4779354,
          description: "✨ | Please wait... I'm generating your image",
        },
      });
      const triggered = await canvacord.Canvas.trigger(
        User.user.displayAvatarURL({
          dynamic: false,
          format: "png",
          size: 2048,
        })
      );
      const attachment = new Discord.MessageAttachment(triggered, "triggered.gif");
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
