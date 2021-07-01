const db = require("quick.db");

module.exports = {
  config: {
    name: "disableleavechannel",
    aliases: ["dlcn"],
    category: "moderation",
    description: "Disables Server Leave Channel Channel",
    usage: "[channel name | channel mention | channel ID]",
    accessableby: "Administrators",
  },
  run: async (bot, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**You Do Not Have The Required Permissions! - [ADMINISTRATOR]**");

    try {
      let a = db.fetch(`leavecha_${message.guild.id}`);

      if (!a) {
        return message.channel.send("**There Is No Leave Channel  Channel Set To Disable!**");
      } else {
        let channel = message.guild.channels.cache.get(a);
        bot.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send("**Leave Channel  Channel Disabled!**");
        db.delete(`leavecha_${message.guild.id}`);

        message.channel.send(`**Leave Channel  Channel Has Been Successfully Disabled in \`${channel.name}\`**`);
      }
      return;
    } catch {
      return message.channel.send("**Error - `Missing Permissions or Channel Doesn't Exist`**");
    }
  },
};
