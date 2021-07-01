const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const translate = require("@iamtraction/google-translate");

module.exports = {
  config: {
    name: "translate",
    aliases: ["ts"],
    description: "Translate Your Message To English",
    usage: "ts or translate",
  },
  run: async (bot, message, args) => {
    const query = args.join(" ");
    if (!query) return message.reply("Plis Specify Text To Translate English Version");

    const Translated = await translate(query, { to: "en" });
    message.channel.send("**Translated Text : **" + Translated.text);
  },
};
