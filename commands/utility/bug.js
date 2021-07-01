const Discord = require("discord.js");

module.exports = {
  config: {
    name: "bugs",
    description: "Report a bug.",
  },
  run: async (bot, message, args) => {
    if (!args[0]) return message.reply("Please specify the bug. Example:\n`?bugs isn't working. It isn't mentioning the user I'm trying to punch`");
    if (args[0] === "bugs") return message.reply("Please specify the bug. Example:\n`?bugs isn't working. It isn't mentioning the user I'm trying to punch`");
    args = args.join(" ");
    message.reply("Thanks for submitting a bug! For The View Accept Bugs Join Discord https://discord.gg/dY4Mt4ccJV");
    const content = `\`\`\`**${message.author.username}#${message.author.discriminator}** (${message.author.id}) reported:\n~~--------------------------------~~\n${args}\n~~--------------------------------~~\nOn the server: **${message.guild.name}**\nServer ID: **${message.guild.id}**\`\`\``;
    const embed1 = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription("**SOME BUGS**")
      .addField("**Name:**", `${message.author.username}#${message.author.discriminator}`, true)
      .addField("**Bugs:**", `${args}`, true)
      .addField("**Guild Name:**", `${message.guild.name}`, true)
      .addField("**Guild ID:**", `${message.guild.id}`)
      .setTimestamp()
      .setFooter("@ Ajds Bots");
    bot.channels.cache.get("857629168334667797").send(embed1);
  },
};
