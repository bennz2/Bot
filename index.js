/*Copyright (c) 2021 Lynxx.

Permission is hereby granted, free of charge, to any person obtaining a copy

of this software and associated documentation files (the "Software"), to deal

in the Software without restriction, including without limitation the rights

to use, copy, modify, merge, publish, distribute, sublicense, and/or sell

copies of the Software, and to permit persons to whom the Software is

furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all

copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR

IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,

FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE

AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER

LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,

OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE

SOFTWARE.*/

//====================================================================================CONSTANTS REQUIRED ON READY=============================================================================================
const { Client, Collection } = require("discord.js");
const { PREFIX, TOKEN } = require("./config");
const bot = new Client({ disableMentions: "everyone" });
const fs = require("fs");
const db = require("quick.db");
const Enmap = require("enmap");
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const path = require("path");
const Canvas = require("canvas");
const smartestchatbot = require("smartestchatbot");
const scb = new smartestchatbot.Client();
require("discord-reply");
//============================================================================================================================================================================================================
const nz_date_string = new Date().toLocaleString("en-US", {
  timeZone: "Asia/Hong_Kong",
});
require("dotenv").config();

// Collection
bot.commands = new Collection();
bot.aliases = new Collection();
bot.snipes = new Collection();
bot.mapss = new Map();
bot.mapss.set("uptimedate", nz_date_string);
const { GiveawaysManager } = require("discord-giveaways");

//============================================================================================================================================================================================================

//============================================================================================INITIALIZING====================================================================================================
["aliases", "commands"].forEach((x) => (bot[x] = new Collection()));
["console", "command", "event"].forEach((x) => require(`./handler/${x}`)(bot));

bot.categories = fs.readdirSync("./commands/");

["command"].forEach((handler) => {
  require(`./handler/${handler}`)(bot);
});
bot.settings = new Enmap({
  name: "settings",
  fetchAll: false,
  autoFetch: true,
  cloneLevel: "deep",
});

bot.moderationdb = new Enmap("moderation");
//============================================================================================================================================================================================================
bot.giveawaysManager = new GiveawaysManager(bot, {
  storage: "./giveaways.json",
  updateCountdownEvery: 5000,
  default: {
    botsCanWin: false,
    embedColor: "#FF0000",
    reaction: "🎉",
  },
});

bot.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
  console.log(`${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});

bot.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {
  console.log(`${member.user.tag} unreact to giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});

bot.giveawaysManager.on("giveawayEnded", (giveaway, winners) => {
  console.log(`Giveaway #${giveaway.messageID} ended! Winners: ${winners.map((member) => member.user.username).join(", ")}`);
});
//=========================================================================================MENTION SETTINGS===========================================================================================
/*bot.on("guildMemberAdd", async (member) => {
  //If not in a guild return
  if (!member.guild) return;
  //create a new Canvas
  const canvas = Canvas.createCanvas(1772, 633);
  //make it "2D"
  const ctx = canvas.getContext("2d");
  //set the Background to the welcome.png
  const background = await Canvas.loadImage(`./welcome.png`);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#f2f2f2";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
  //set the first text string
  var textString3 = `${member.user.username}`;
  //if the text is too big then smaller the text
  if (textString3.length >= 14) {
    ctx.font = "bold 100px Genta";
    ctx.fillStyle = "#f2f2f2";
    ctx.fillText(textString3, 720, canvas.height / 2 + 20);
  }
  //else dont do it
  else {
    ctx.font = "bold 150px Genta";
    ctx.fillStyle = "#f2f2f2";
    ctx.fillText(textString3, 720, canvas.height / 2 + 20);
  }
  //define the Discriminator Tag
  var textString2 = `#${member.user.discriminator}`;
  ctx.font = "bold 40px Genta";
  ctx.fillStyle = "#f2f2f2";
  ctx.fillText(textString2, 730, canvas.height / 2 + 58);
  //define the Member count
  var textString4 = `Member #${member.guild.memberCount}`;
  ctx.font = "bold 60px Genta";
  ctx.fillStyle = "#f2f2f2";
  ctx.fillText(textString4, 750, canvas.height / 2 + 125);
  //get the Guild Name
  var textString4 = `${member.guild.name}`;
  ctx.font = "bold 60px Genta";
  ctx.fillStyle = "#f2f2f2";
  ctx.fillText(textString4, 700, canvas.height / 2 - 150);
  //create a circular "mask"
  ctx.beginPath();
  ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true); //position of img
  ctx.closePath();
  ctx.clip();
  //define the user avatar
  const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: "jpg" }));
  //draw the avatar
  ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);
  //get it as a discord attachment
  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome-image.png");
  //define the welcome embed
  const welcomeembed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter("Welcome", member.guild.iconURL({ dynamic: true }))
    .setDescription(
      `**Welcome to ${member.guild.name}!**
      Hi <@${member.id}>!, read and accept the rules <#856884275553894420>!`
    )
    .setImage("attachment://welcome-image.png")
    .attachFiles(attachment);
  //define the welcome channel
  const channel = member.guild.channels.cache.find((ch) => ch.id === "856884285809360916").send(welcomeembed);
  //send the welcome embed to there
  //member roles add on welcome every single role
});*/
bot.on("guildMemberRemove", (member) => {
  // You Can Do The Same For Leave Message
  let channel1 = db.fetch(`leavecha_${member.guild.id}`);
  if (!channel1) return;
  const embed1 = new MessageEmbed()
    .setColor("RANDOM")
    .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
    .addField(":cry: **Leave Message**", ` ${member.user.tag} `)
    .addField("**Quetos**", " **Jangan lupa Balik Ya** :)");
  var sChannel1 = bot.channels.cache.get(channel1);
  if (!sChannel1) return;
  sChannel1.send(embed1);
});

bot.on("message", async (message) => {
  let channel = db.fetch(`smartbot_${message.guild.id}`);
  if (!channel) return;
  var sChannel = message.guild.channels.cache.get(channel);
  if (!sChannel) return;
  if (message.author.bot) return;
  if (message.channel.id != sChannel) return;
  //if (message.content === "test") return message.inlineReply(`yo`)
  if (!message.content) return;
  message.channel.startTyping();
  if (!message.content) return message.lineReply("Please say something.");
  scb.chat({ message: message.content, name: bot.user.username, owner: "Aldrich1212", user: message.author.id, language: "en" }).then((reply) => {
    message.lineReply(reply);
    message.channel.stopTyping();
  });

  let prefix;
  try {
    let fetched = await db.fetch(`prefix_${message.guild.id}`);
    if (fetched == null) {
      prefix = PREFIX;
    } else {
      prefix = fetched;
    }
  } catch {
    prefix = PREFIX;
  }
  try {
    if (message.mentions.has(bot.user.id) && !message.content.includes("@everyone") && !message.content.includes("@here")) {
      message.channel.send(`\n**My prefix for** \`${message.guild.name}\` **is** \`${prefix}\` **Type** \***${prefix}help\*** **for help**`);
    }
  } catch {
    return;
  }
});

//============================================================================================================================================================================================================

bot.login(TOKEN);
