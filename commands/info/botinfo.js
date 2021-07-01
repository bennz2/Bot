const db = require("quick.db");
const { PREFIX } = require("../../config");
const { MessageEmbed } = require("discord.js");
const { version } = require("../../package.json");
const { version: discordjsVersion } = require("discord.js");
const ms = require("pretty-ms");
const os = require("os");

module.exports = {
  config: {
    name: "botinfo",
    description: "Info Bot",
    usage: "?botinfo",
    example: "?botinfo",
    aliases: ["infobot"],
  },

  run: async (bot, message, args) => {
    message.channel.startTyping();
    let bicon = bot.user.displayAvatarURL; //bot avatar
    let botembed = new MessageEmbed()
      .setAuthor(`${bot.user.username} Bot Information`, bot.user.displayAvatarURL())
      .setColor("#" + (((1 << 24) * Math.random()) | 0).toString(16)) //hex color randomizer
      .setThumbnail(bicon)
      .addField("**Uptime**", `\`\`\`${ms(bot.uptime)}\`\`\``, true)
      .addField("**WebSocket Ping**", `\`\`\`${bot.ws.ping}ms\`\`\``, true)
      .addField("**Memory**", `\`\`\`${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB Heap\`\`\``, true)
      .addField("**Guild Count**", `\`\`\`${bot.guilds.cache.size} guilds\`\`\``, true)
      .addField(`**User Count**`, `\`\`\`${bot.users.cache.size} users\`\`\``, true)
      .addField("**Commands**", `\`\`\`${bot.commands.size} cmds\`\`\``, true)
      .addField("**Node Js**", `\`\`\`${process.version} on ${process.platform} ${process.arch}\`\`\``, true)
      .addField("**Cached Data**", `\`\`\`${bot.users.cache.size} users\n${bot.emojis.cache.size} emojis\`\`\``, true)
      .addField("**Discord.js**", `\`\`\`${discordjsVersion}\`\`\``, true)
      .addField("**Platform**", `\`\`\`${process.platform}\`\`\``, true)
      .setTimestamp()
      .setFooter(`PID ${process.pid} | Cluster | Shard ${message.guild.shardID}`);

    message.lineReply(botembed);
    message.channel.stopTyping();
  },
};
