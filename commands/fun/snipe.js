const Discord = require("discord.js");
const colors = require("../../colors.json");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
  const msg = bot.snipes.get(message.channel.id);
  const embed = new Discord.MessageEmbed()
    .setAuthor(msg.author, msg.member.user.displayAvatarURL())
    .setColor("RANDOM")
    .setDescription(msg.content)
    .setTimestamp()
    .setFooter(`This command requested by ${message.author.username}#${message.author.discriminator}`);
  message.channel.send(embed);
};

module.exports.config = {
  name: "snipe",
  aliases: [],
};
