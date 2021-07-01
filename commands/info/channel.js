const Discord = require("discord.js");
const canvacord = require("canvacord");
const emojis = require("../../config/emoji.json");

module.exports = {
  config: {
    name: "channel",
    description: "This command is used for channel.",
    usage: "channel",
    accessableby: "Members",
    aliases: ["channelinfo"],
  },
  run: async (bot, message, args) => {
    const channelinfo = message.mentions.channels.first() || message.channel;

    const nsfwinf = channelinfo.nsfw ? "NSFW" : "Non-NSFW";
    const parentV = channelinfo.parent ? channelinfo.parent : "No parent category";
    const topicV = channelinfo.topic ? channelinfo.topic : "No topic for this channel";
    const embed = new Discord.MessageEmbed()
      .setTitle(`Channel Information: ${channelinfo.name}`)
      .setDescription(`Topic: ${topicV}\nType: ${nsfwinf}\nCategory: ${parentV}\nPosition: ${channelinfo.position}\nChannelID: ${channelinfo.id}`)
      .setColor("RANDOM");

    return message.channel.send(embed);
  },
};
