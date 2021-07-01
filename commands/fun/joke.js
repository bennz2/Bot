const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  config: {
    name: "joke",
    aliases: ["dad-joke", "dadjoke"],
    description: "Display a random dad joke",
    category: "Fun",
    usage: "joke",
  },
  run: async (bot, message, args) => {
    (async () => {
      try {
        const response = await fetch("http://icanhazdadjoke.com/", {
          method: "get",
          headers: {
            Accept: "application/json",
          },
        });
        const body = await response.json();
        const embed = new Discord.MessageEmbed() // Prettier()
          .setTitle("Random Dad Joke", message.guild.iconURL())
          .setDescription("Dad said: " + body.joke)
          .setColor("RANDOM")
          .setFooter(
            "Requested by " + `${message.author.username}`,
            message.author.displayAvatarURL({
              dynamic: true,
              format: "png",
              size: 2048,
            })
          )
          .setTimestamp();
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
