const Discord = require("discord.js");
const colors = require("../../colors.json");
const fetch = require("node-fetch");
const moment = require("moment");

module.exports = {
  config: {
    name: "github",
    aliases: ["git"],
  },
  run: async (bot, message, args) => {
    if (!args[0])
      return message.channel.send({
        embed: {
          description: `**Please Give Me A Github Username!**`,
        },
      });
    // Made by Zukii
    fetch(`https://api.github.com/users/${args.join("-")}`)
      .then((res) => res.json())
      .then((body) => {
        if (body.message)
          return message.channel.send({
            embed: {
              description: ` **User Not Found | Please Give Me A Valid Username!**`,
            },
          });
        message.channel.startTyping();
        let { login, avatar_url, name, id, html_url, company, public_repos, public_gists, twitter_username, email, followers, following, location, created_at, bio } = body;

        const embed = new Discord.MessageEmbed() // Prettier()
          .setTitle(`🐙 ${login} Github`, avatar_url)
          .setColor(`RANDOM`)
          .setThumbnail(avatar_url)
          .addField(`<:members:856161806606401556> Username`, `\`\`\`${login}\`\`\``)
          .addField(`📝 Bio`, `\`\`\`${bio || "❌ Bio not provided"}\`\`\``)
          .addField(`📚 Public Repositories`, `\`\`\`${public_repos || "0"}\`\`\``, true)
          .addField(`📚 Public Gists`, `\`\`\`${public_gists || "0"}\`\`\``, true)
          .addField(`🖇️ Followers`, `\`\`\`${followers}\`\`\``, true)
          .addField(`📎 Following`, `\`\`\`${following}\`\`\``, true)
          .addField(`🐙 Github ID`, `\`\`\`${id}\`\`\``)
          .addField(`🌐 Location`, `\`\`\`${location || "❌ Unknown location"}\`\`\``)
          .addField(`🐦 Twitter`, `\`\`\`${twitter_username || "None"}\`\`\``)
          .addField(`🚀 Company`, `\`\`\`${company || "❌ No company"}\`\`\``)
          .addField(`⏱️ Account Created`, moment.utc(created_at).format("dddd, MMMM, Do YYYY"))
          .setFooter(
            "Requested by " + `${message.author.username}`,
            message.author.displayAvatarURL({
              dynamic: true,
              format: "png",
              size: 2048,
            })
          )
          .setTimestamp();
        message.lineReply({
          embed: embed,
        });
        message.channel.stopTyping();
      });
  },
};
