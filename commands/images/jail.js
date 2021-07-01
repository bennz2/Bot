const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports = {
  config: {
    name: "jail",
    aliases: [],
    description: "Sends user to jail",
    usage: "jail [user mention, user id, user name]",
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
          description: "✨ | Please wait... I'm Generate Your Image",
        },
      });
      const jail = await canvacord.Canvas.jail(
        User.user.displayAvatarURL({
          dynamic: true,
          format: "png",
          size: 2048,
        })
      );
      const attachment = new Discord.MessageAttachment(jail, "jail.png");
      message.lineReply(attachment);
    } catch (err) {
      console.log(err);
      message.channel.send({
        embed: {
          color: 16734039,
          description: "Something went wrong... :cry:",
        },
      });
    }
  },
};
