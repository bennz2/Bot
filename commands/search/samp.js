const query = require("samp-query");
const { getServerVersion } = require("../../config/samp.js");
const MessageEmbed = require("discord.js");

module.exports = {
  config: {
    name: "samp",
    aliases: ["sampstats"],
  },
  run: async (bot, message, args) => {
    if (!args[0]) return message.channel.send("**Pliss Insert Ip**");
    if (!args[1]) return message.channel.send("**Pliss Insert Port**");
    var options = {
      host: args[0],
      port: args[1],
    };
    let bicon = bot.user.displayAvatarURL; //bot avatar
    var s;
    query(options, function (error, response) {
      if (error) {
        message.channel.send(`I Cant Connet To Ip And Port **${args[0]} ${args[1]}**`);
      } else {
        const embedColor = "RANDOM";

        const logMessage = {
          embed: {
            title: `${response["hostname"]}`,
            color: embedColor,
            fields: [
              { name: "**IP**", value: args[0] },
              { name: "**Gamemode**", value: response["gamemode"] },
              { name: "**Language**", value: response["mapname"] },
              { name: "**Version**", value: `${response["rules"].version}` },
              { name: "**Website**", value: `${response["rules"].weburl}` },
              { name: "**Map**", value: `${response["rules"].mapname}` },
              { name: "**Players**", value: `${response["online"]}/${response["maxplayers"]}` },
              // { name: "**Website**", value: `${result.rules.weburl}` },
            ],
            thumbnail: `${bot.user.displayAvatarURL}`,
            timestamp: new Date(),
            footer: {
              text: `This command requested by ${message.author.username}#${message.author.discriminator}`,
            },
          },
        };
        message.channel.send(logMessage);
      }
    });
  },
};
