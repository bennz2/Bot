const backup = require("discord-backup");
const Discord = require("discord.js");

module.exports = {
  config: {
    name: "load-backup",
    aliases: ["backupload"],
    description: "Your Backups Server Loads",
    usage: "load-backup",
  },
  run: async (bot, message, args) => {
    // If the member doesn't have enough permissions
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(":x: You need to have the manage messages permissions to create a backup in this server.");
    }

    const backupID = args.join(" ");

    backup
      .fetch(backupID)
      .then(() => {
        message.channel.send(":warning: All the server channels, roles, and settings will be cleared. Do you want to continue? Send `-confirm` or `cancel`!");

        const collector = message.channel.createMessageCollector((m) => m.author.id === message.author.id && ["-confirm", "cancel"].includes(m.content), {
          time: 60000,
          max: 1,
        });
        collector.on("collect", (m) => {
          const confirm = m.content === "-confirm";
          collector.stop();
          if (confirm) {
            backup
              .load(backupID, message.guild)
              .then(() => {
                const embed1 = new Discord.MessageEmbed().setAuthor(":white_check_mark:Succes").setColor("RANDOM").addField("**Your Backups Id** ", `${backupID} Loaded successfully`);
                return message.author.send(embed1);
              })
              .catch((err) => {
                if (err === "No backup found") return message.channel.send(":x: No backup found for ID " + backupID + "!");
                else return message.author.send(":x: An error occurred: " + (typeof err === "string") ? err : JSON.stringify(err));
              });
          } else {
            return message.channel.send(":x: Cancelled.");
          }
        });

        collector.on("end", (collected, reason) => {
          if (reason === "time") return message.channel.send(":x: Command timed out! Please retry.");
        });
      })
      .catch(() => {
        return message.channel.send(":x: No backup found for ID " + backupID + "!");
      });
  },
};
