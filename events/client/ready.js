const { PREFIX, LAVA_HOST, LAVA_PASSWORD, LAVA_PORT } = require("../../config");
const { MessageEmbed } = require("discord.js");

(module.exports = async (bot) => {
  console.log(`${bot.user.username} is available now!`);
  console.log(`${bot.commands.size} cmds Succes Loaded ✅ `);
  // var activities = [`📊 ${bot.guilds.cache.size} servers`, `📊 ${bot.users.cache.size} users!`],
  // i = 0;
  // setInterval(() => bot.user.setActivity(`❤️ Ilove You  | ${activities[i++ % activities.length]}`, { type: "WATCHING" }), 5000);
  bot.user.setActivity(`I Love You ❤️   `, { type: "WATCHING" });
}),
  180000;
