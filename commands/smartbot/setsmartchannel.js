const db = require("quick.db");

module.exports = {
  config: {
    name: "setsmartchannel",
    category: "Smart Bot",
    aliases: ["smrc"],
    description: "Sets A Channel Where The Bot Can Send Smart Bot!",
    usage: "[channel mention | channel ID | channel name]",
  },
  run: async (bot, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**You Do Not Have The Required Permissions! - [ADMINISTRATOR]**");
    if (!args[0]) {
      let b = await db.fetch(`smartbot_${message.guild.id}`);
      let channelName = message.guild.channels.cache.get(b);
      if (message.guild.channels.cache.has(b)) {
        return message.channel.send(`**Smart Bot  Channel Set In This Server Is \`${channelName.name}\`!**`);
      } else
        return message.lineReply({
          embed: {
            color: 16734039,
            description: "❌ | Please Enter A Channel Name or ID To Set!",
          },
        });
    }
    let channel = message.mentions.channels.first() || bot.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find((c) => c.name.toLowerCase() === args.join(" ").toLocaleLowerCase());

    if (!channel || channel.type !== "text") return message.channel.send("**Please Enter A Valid Text Channel!**");

    try {
      let a = await db.fetch(`smartbot_${message.guild.id}`);

      if (channel.id === a) {
        return message.channel.send("**This Channel is Already Set As Smart Bot Channel!**");
      } else {
        bot.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send("**Smart Bot  Channel Set!**");
        db.set(`smartbot_${message.guild.id}`, channel.id);

        message.channel.send(`**Smart Bot Channel Has Been Set Successfully in \`${channel.name}\`!**`);
      }
    } catch {
      return message.channel.send("**Error - `Missing Permissions Or Channel Is Not A Text Channel!`**");
    }
  },
};
