const { MessageEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
  config: {
    name: "slap",
    description: "slap",
    usage: "?slap <user>",
    example: "?baka @asep",
  },
  run: async (bot, message, args) => {
    try {
      const response = await axios.get("https://nekos.life/api/v2/img/slap");
      const slap = response.data;

      let member = message.mentions.members.first();
      if (!args[0]) return message.reply("Pliss Mention User To Slap!");

      const embed = new MessageEmbed();

      if (message.author.id === member.user.id) {
        embed.setTitle(`You self Slaped 😳`);
        embed.setColor("RANDOM");
        embed.setImage(slap.url);

        message.lineReply(embed);
      } else {
        embed.setTitle(`${message.guild.member(member).displayName}  Baka! ≡(▔﹏▔)≡`);
        embed.setColor("RANDOM");
        embed.setImage(slap.url);

        message.lineReply(embed);
      }
    } catch (error) {
      return message.channel.send(`Something went wrong: ${error.message}`);
      // Restart the bot as usual.
    }
  },
};
