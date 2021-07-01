const Discord = require("discord.js");
const beautify = require("beautify");
const { MessageButton } = require("discord-buttons");

module.exports = {
  config: {
    name: "eval",
  },
  run: async (bot, message, args) => {
    try {
      if (message.author.id !== "755714902328606760") {
        return message.lineReply({
          embed: {
            color: 16734039,
            description: "❌ | You do not have permission to run this command (Only owner of the bot can run this)!",
          },
        });
      }
      var result = args.join(" ");
      if (!result) {
        return message.lineReply({
          embed: {
            color: 16734039,
            description: "❌ | Please input code to evaluate!",
          },
        });
      }
      let evaluated = eval(result);
      console.log(result);
      const success = new Discord.MessageEmbed() // Prettier()
        .setColor("RANDOM")
        .setTitle("💡 Eval")
        .addField(`Input:\n`, "```js\n" + `${args.join(" ")}` + "```", false)
        .addField(`Output:\n`, "```js\n" + evaluated + "```", true)
        .setFooter(
          "Requested by " + `${message.author.username}`,
          message.author.displayAvatarURL({
            dynamic: true,
            format: "png",
            size: 2048,
          })
        );
      message.lineReply(success);
    } catch (err) {
      const errormessage = new Discord.MessageEmbed() // Prettier()
        .setColor("#e31212")
        .setTitle("An error has occured")
        .addField(`Input:\n`, "```js\n" + `${result}` + "```", false)
        .addField(`Output:\n`, "```js\n" + `${err.message}` + "```", true)
        .setFooter(
          "Requested by " + `${message.author.username}`,
          message.author.displayAvatarURL({
            dynamic: true,
            format: "png",
            size: 2048,
          })
        );
      return message.lineReply(errormessage);
    }
  },
};
