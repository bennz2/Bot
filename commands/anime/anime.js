const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const randomanime = require("random-anime");

module.exports = {
  config: {
    name: "anime",
    usage: "anime",
    aliases: ["an"],
  },
  run: async (bot, message, args) => {
    const anime = randomanime.anime();
    const embed = new Discord.MessageEmbed().setColor("RANDOM").setTitle("random anime").setImage(anime).setFooter(`This command requested by ${message.author.username}#${message.author.discriminator}`);

    message.channel.send(embed);
  },
};
