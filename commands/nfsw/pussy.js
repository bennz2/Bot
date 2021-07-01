const Discord = require("discord.js");
const axios = require("axios");

module.exports = {
  config: {
    name: "pussy",
    description: "Get a NSFW URL of a pussy image/gif",
    usage: "?pussy",
    example: "?pussy",
  },
  run: async (bot, message, args) => {
    if (!message.channel.nsfw) return message.channel.send(":x: This Nots Nsfw Channel");

    try {
      const responseOne = await axios.get("https://nekos.life/api/v2/img/pussy");
      const responseTwo = await axios.get("https://nekos.life/api/v2/img/pussy_jpg");
      const responseThree = await axios.get("https://nekos.life/api/v2/img/tits");
      const responseFour = await axios.get("https://nekos.life/api/v2/img/pwankg");

      const genre = [responseOne.data, responseTwo.data, responseThree.data, responseFour.data];
      const random = genre[Math.floor(Math.random() * genre.length)];

      const pussy = random;
      let embed = new Discord.MessageEmbed().setTitle("( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)").setColor("#985ce7").setImage(pussy.url);

      message.lineReply(embed);
    } catch (error) {
      return message.channel.send(`Something went wrong: ${error.message}`);
      // Restart the bot as usual.
    }
  },
};
