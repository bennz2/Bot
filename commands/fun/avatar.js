const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  config: {
    name: "avatar",
    aliases: ["av"],
    category: "fun",
    description: "Use This Command To Show Photo Profile User",
    usage: "?avatar [user]",
  },
  run: async (bot, message, args) => {
    let Member = message.mentions.users.first() || message.guild.member(args[0]) || message.author;

    let embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .addField(
        "Links Into Image",
        `[Png](${Member.displayAvatarURL({
          format: "png",
          dynamic: true,
        })}) | [Jpg](${Member.displayAvatarURL({
          format: "jpg",
          dynamic: true,
        })}) | [Webp](${Member.displayAvatarURL({
          format: "webp",
          dynamic: true,
        })})`
      )
      .setImage(Member.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setTimestamp();

    message.channel.send(embed);

    //End
  },
};
