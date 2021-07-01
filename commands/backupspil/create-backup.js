const backup = require("discord-backup");
const { PREFIX } = require("../../config.js");
const db = require("quick.db");

module.exports = {
  config: {
    name: "create-backup",
    aliases: ["backupcreate"],
    description: "Create Backup Of Your Server",
    usage: "backupcreate or createbackup",
  },
  run: async (bot, message, args) => {
    prefix = db.fetch(`prefix_${message.guild.id}`);
    if (!prefix) prefix = PREFIX;
    // If the member doesn't have enough permissions
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.channel.send(":x: You need to have the manage messages permissions to create a backup in this server.");
    }

    backup
      .create(message.guild)
      .then((backupData) => {
        return message.author.send("Backup created! Here is your ID: `" + backupData.id + "`! Use `" + `${prefix}` + "load-backup " + backupData.id + "` to load the backup on another server!");
      })
      .catch(() => {
        return message.channel.send(":x: Eror, This Bot Not Permission Of Administrator!");
      });
    await message.channel.send(":exclamation: **Wait 10-20 Seconds And check your dm :warning: **Dont Close Your Dm !!**");
  },
};
