const Discord = require("discord.js");
const superagent = require("superagent");
const randomanime = require("random-anime");

module.exports = {
  config: {
    name: "hentai",
    aliases: ["hh"],
    description: "Hentai Anime NFSW ONLY!!!!",
    usage: "hentai",
  },
  run: async (bot, message, args) => {
    if (message.channel.nsfw === true) {
      //   const { body } = await superagent.get("https://nekos.life/api/v2/img/hentai");
      const nsfw = randomanime.nsfw();

      const embed = new Discord.MessageEmbed().setColor("RANDOM").setTitle(" ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)").setImage(nsfw).setFooter(`This command requested by ${message.author.username}#${message.author.discriminator}`);
      message.lineReply(embed);
    } else {
      message.channel.send(":warning: This isn't NSFW channel!");
    }
  },
};
