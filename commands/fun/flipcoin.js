const { MessageEmbed } = require("discord.js");

module.exports = {
  config: {
    name: "flipcoin",
    aliases: ["coinflip"],
    description: "Flip a coin.",
    cooldown: [],
    usage: [],
    example: [],
  },
  run: async (bot, message, args) => {
    var flipcoin = ["heads", "tails"];

    let embed = new MessageEmbed().setColor("RANDOM").addField(":coin: flipcoin", "Flipping a coin...").setFooter(message.author.tag, message.author.avatarURL).setTimestamp();

    var msg = await message.channel.send({ embed: embed });

    setTimeout(function () {
      msg.delete();
      let embed2 = new MessageEmbed()
        .setColor("RANDOM")
        .addField(":coin: flipcoin", `It landed ${flipcoin[Math.floor(Math.random() * flipcoin.length)]} up`)
        .setFooter(message.author.tag, message.author.avatarURL)
        .setTimestamp();

      message.channel.send({ embed: embed2 });
    }, 500);
  },
};
