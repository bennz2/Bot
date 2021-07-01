const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  config: {
    name: "sreply",
    aliases: ["reply"],
    category: "suggestion",
  },
  run: async (bot, message, args) => {
    let channel = await db.fetch(`suggestion_${message.guild.id}`);
    if (channel === null) return;

    if (!message.member.hasPermission("MANAGE_GUILD")) return;

    const rgx = /^(?:<@!?)?(\d+)>?$/;

    const messageID = args[0];
    const replyQuery = args.slice(1).join(" ");

    const number = new MessageEmbed().setDescription(`:x:    | I don't think that was a Message ID!`).setColor("RANDOM");

    const id = new MessageEmbed().setDescription(`:x:   |You forgot to specify Message ID!`).setColor("RANDOM");

    const query = new MessageEmbed().setDescription(`:x:    | You forgot to specify the Reply!`).setColor("RANDOM");

    const reply = new MessageEmbed().setDescription(`:white_check_mark:  | Successfully Replied the Suggestion.`).setColor("RANDOM");

    const noChannel = new MessageEmbed().setDescription(`:x:    | No Suggestion Channel found!`).setColor("RANDOM");

    const noMessage = new MessageEmbed().setDescription(`:x:  | Didn't find any Message with that ID!`).setColor("RANDOM");

    if (!messageID) return message.channel.send(id);

    if (!rgx.test(messageID)) return message.channel.send(number);

    if (!replyQuery) return message.channel.send(query);

    try {
      const suggestionChannel = message.guild.channels.cache.get(channel);

      if (!suggestionChannel) return message.channel.send(noChannel);

      const suggestedEmbed = await suggestionChannel.messages.fetch(messageID).catch((error) => {
        const noMessage = new MessageEmbed().setDescription(`:x:   | Didn't find any Message with that ID!`).setColor("FF2052");
        return message.channel.send(noMessage);
      });

      const data = suggestedEmbed.embeds[0];

      const replyEmbed = new MessageEmbed()
        .setAuthor(`${data.author.name}`, data.author.iconURL)
        .setDescription(data.description)
        .setColor("BLUE")
        .addField(`Reply from ${message.author.tag}`, replyQuery)
        .setFooter("Status: Replied")
        .setTimestamp();

      suggestedEmbed.edit(replyEmbed);

      message.channel.send(reply);

      const user = await bot.users.cache.find((u) => u.tag === data.author.name);

      const embed = new MessageEmbed().setDescription(`You have got a Reply over your Suggestion :eyes: . **[Message Link](https://discord.com/channels/${message.guild.id}/${channel}/${messageID})**`).setColor("BLUE");
      user.send(embed);
    } catch (err) {
      return;
    }
  },
};
