const Discord = require("discord.js");

module.exports = {
  config: {
    name: "kiss",
    description: "This command is used for kiss someone u loVe.",
    usage: "d!kiss <mentions>",
    aliases: [],
  },
  run: async (bot, message, args) => {
    try {
      const member = message.mentions.members.first();
      require("request")({ url: "https://nekos.life/api/kiss", json: true }, (req, res, json) => {
        if (member) {
          const embed = new Discord.MessageEmbed()
            .setTitle(`${message.author.username} Has Kisses ${member.user.username}`)
            .setColor("RANDOM")

            .setImage(json.url);

          message.channel.send(embed);
        } else message.reply(":warning: Mention User Need To kiss Pliss!!!");
      });
    } catch (err) {
      message.channel.send(`Their was an error!\n${err}`).catch();
    }
  },
};
