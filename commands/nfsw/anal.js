const Discord = require("discord.js");
const axios = require("axios");

module.exports = {
  config: {
    name: "anal",
    description: "Gets a NSFW URL of anal image/gif",
    usage: "?anal",
    example: "?anal",
  },
  run: async (bot, message, args) => {
    if (!message.channel.nsfw) return message.channel.send(":x: This Nots Nsfw Channel");

    try {
      const response = await axios.get("https://nekos.life/api/v2/img/anal");
      const rhentai = response.data;

      const embed = new Discord.MessageEmbed().setTitle("( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)").setColor("#985ce7").setImage(rhentai.url);

      message.lineReply(embed);
    } catch (error) {
      return message.channel.send(`Something went wrong: ${error.message}`);
    }
  },
};
