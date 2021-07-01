const discord = require("discord.js");
const superagent = require("superagent");

module.exports = {
  config: {
    name: "porno",
    aliases: ["porn"],
    description: "Porn NFSW ONly",
    usage: "porn",
  },
  run: async (bot, message, args) => {
    if (message.channel.nsfw === true) {
      superagent
        .get("https://nekobot.xyz/api/image")
        .query({ type: "pgif" })
        .end((err, response, body) => {
          const emb = new discord.MessageEmbed().setImage(response.body.message).setColor("RANDOM").setTitle(" ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)").setFooter(` This command requested by ${message.author.username}#${message.author.discriminator}`);

          message.lineReply(emb);
        });
    } else {
      message.channel.send("This isn't NSFW channel!");
    }
  },
};
