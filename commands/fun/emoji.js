const Discord = require("discord.js");
const moment = require("moment");
const emoji = require("discord-emoji-convert");

module.exports = {
  config: {
    name: "emojitext",
    aliases: ["emojify"],
    description: "Emoji With Text ",
  },
  run: async (bot, message, args) => {
    try {
      const emojis = args.join(" ");
      if (!emojis) {
        return message.lineReply({
          embed: {
            color: 16734039,
            description: "❌ | Please enter text to convert!",
          },
        });
      }
      if (args.join(" ").lenght > 30) {
        return message.lineReply({
          embed: {
            color: 16734039,
            description: "❌ | Please enter shorter string, maximum length is 30 characters!",
          },
        });
      }
      const converted = emoji.convert(emojis);
      if (!converted) {
        return message.lineReply({
          embed: {
            color: 16734039,
            description: "❌ | I cannot convert the text",
          },
        });
      }
      const embed = new Discord.MessageEmbed() // Prettier()
        .setColor("RANDOM")
        .setTitle(`Text To Emoji`)
        .addField("Converted text", converted)
        .addField("Converted text (Code)", "```" + converted.toString().substr(0, 1000) + "```")
        .setFooter(
          "Requested by " + `${message.author.username}`,
          message.author.displayAvatarURL({
            dynamic: true,
            format: "png",
            size: 2048,
          })
        );
      message.lineReply(embed);
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
