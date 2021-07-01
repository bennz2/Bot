const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  config: {
    name: "resetwarnings",
    description: "reset warn",
    usage: "warnings reset",
    aliases: ["warnclear"],
  },
  run: async (bot, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("Yopu should have admin perms to use this command");
    }

    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send("Please mention the person whose warning you want to reset");
    }

    if (message.mentions.users.first().bot) {
      return message.channel.send("Bot are not allowed to have warnings");
    }

    db.delete(`warnings_${message.guild.id}_${user.id}`);
    user.send(`Your all warnings are reseted by ${message.author.username} from ${message.guild.name}`);
    await message.channel.send(`Reseted all warnings of ${message.mentions.users.first().username}`); //DO NOT FORGET TO USE ASYNC FUNCTION
  },
};
