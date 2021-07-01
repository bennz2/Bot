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
    var s;
    query(options, function (error, response) {
      if (error) {
        message.channel.send(`I Cant Connet To Ip And Port **${args[0]} ${args[1]}**`);
      } else {
        const embedColor = "RANDOM";

        const logMessage = {
          embed: {
            title: "Samp Stats",
            color: embedColor,
            fields: [
              { name: "**Server Name**", value: response["hostname"] },
              { name: "**IP**", value: args[0] },
              { name: "**Gamemode**", value: response["gamemode"] },
              { name: "**Language**", value: response["mapname"] },
              { name: "**Status**", value: "<a:black:856916288449806346>Online" },
              { name: "**Players**", value: `${response["online"]}/${response["maxplayers"]}` },
              // { name: "**Website**", value: `${result.rules.weburl}` },
            ],
            thumbnail: {
              url: "https://cdn.discordapp.com/attachments/855998243238182914/856917708250677248/instagram_profile_image.png",
            },
            timestamp: new Date(),
            footer: {
              text: "Ajds Bots",
            },
          },
        };
        message.channel.send(logMessage);
      }
    });
  },
};
