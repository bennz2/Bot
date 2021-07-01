const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  config: {
    name: "cat",
    aliases: [],
    description: "Gives a random cute cat images.",
    usage: [],
    example: [],
  },
  run: async (bot, message, args) => {
    (async () => {
      try {
        const response = await fetch("https://nekos.life/api/v2/img/meow");
        const body = await response.json();
        const embed = new Discord.MessageEmbed() // Prettier()
          .setTitle(
            "🐱 Random Cat",
            message.guild.iconURL({
              dynamic: true,
              format: "png",
            })
          )
          .setImage(body.url)
          .setColor("RANDOM")
          .setFooter(
            "Requested by " + `${message.author.username}` + " • (Aww cute =＾´• ⋏ •`＾=)",
            message.author.displayAvatarURL({
              dynamic: true,
              format: "png",
              size: 2048,
            })
          )
          .setTimestamp()
          .setURL(body.url);
        message.lineReply(embed);
      } catch (err) {
        message.lineReply({
          embed: {
            color: 16734039,
            description: "Something went wrong... :cry:",
          },
        });
      }
    })();
  },
};
