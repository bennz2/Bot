const Discord = require("discord.js");

module.exports = {
  config: {
    name: "serverinfo",
    description: "Serverinfo You Know Info Your server",
    usage: "serverinfo",
    example: "?infoserver or ?serverinfo",
    aliases: ["infoserver"],
  },

  run: async (bot, message, args) => {
    try {
      var roles = [];
      var e = message.guild.emojis.cache.map((e) => e.toString());
      function checkdays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days") + " ago";
      }
      let region = {
        brazil: ":flag_br: Brazil",
        "eu-central": ":flag_eu: Central Europe",
        singapore: ":flag_sg: Singapore",
        "us-central": ":flag_us: U.S. Central",
        sydney: ":flag_au: Sydney",
        "us-east": ":flag_us: U.S. East",
        "us-south": ":flag_us: U.S. South",
        "us-west": ":flag_us: U.S. West",
        "eu-west": ":flag_eu: Western Europe",
        "vip-us-east": ":flag_us: VIP U.S. East",
        london: ":flag_gb: London",
        europe: ":flag_eu: Europe",
        india: ":flag_in: India",
        amsterdam: ":flag_nl: Amsterdam",
        hongkong: ":flag_hk: Hong Kong",
        russia: ":flag_ru: Russia",
        southafrica: ":flag_za:  South Africa",
      };
      if (message.guild.rulesChannel) {
        rules = "<#" + message.guild.rulesChannel + "> (ID: " + message.guild.rulesChannelID + ")";
      } else {
        rules = "Rules channel not exists";
      }
      if (message.guild.widgetEnabled == "true") {
        widget = "<#" + message.guild.widgetChannel + "> (ID: " + message.guid.widgetChannelID + ")";
      } else {
        widget = "Server widget not enabled";
      }
      message.channel.startTyping();
      const embed = new Discord.MessageEmbed() // Prettier()
        .setAuthor(message.guild.name, message.guild.iconURL)
        .setColor("RANDOM")
        .setThumbnail(
          message.guild.iconURL({
            dynamic: true,
          })
        )
        .addField(" **Server Owner**", "<@" + message.guild.owner + ">")
        .addField(" **ID**", `\`\`\`${message.guild.id}\`\`\``, true)
        .addField(" **Region** ", `\`\`\`${message.guild.region}\`\`\``, true)
        .addField(" **Members**", `\`\`\`${message.guild.memberCount}\`\`\``, true)
        .addField(" **Channels**", `\`\`\`${message.guild.channels.cache.size}\`\`\``, true)
        .addField(" **Roles**", `\`\`\`${message.guild.roles.cache.size}\`\`\``, true)
        .addField(" **Emojis**", `\`\`\`${message.guild.emojis.cache.size}\`\`\``, true)
        .addField(" **Creation Date**", `\`\`\`${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkdays(message.channel.guild.createdAt)})\`\`\``, true)
        .setFooter(
          "Requested by " + `${message.author.username}`,
          message.author.displayAvatarURL({
            dynamic: true,
            format: "png",
            size: 2048,
          })
        )
        .setTimestamp();
      message.lineReply(embed);
      message.channel.stopTyping();
    } catch (err) {
      console.log(err);
      message.channel.send({
        embed: {
          color: 16734039,
          description: "Something went wrong... :cry:",
        },
      });
    }
  },
};
