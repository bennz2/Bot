var Discord = require("discord.js");
const fs = require("fs");
const { PREFIX } = require("../../config");
const db = require("quick.db");
const { stripIndents } = require("common-tags");
const emojis = require("../../config/emoji.json");
const { MessageButton } = require("discord-buttons");
const { send } = require("process");

module.exports = {
  config: {
    name: "help",
    description: "Help Menu",
    usage: "usage ?help",
    example: "help",
    aliases: ["h"],
  },
  run: async (bot, message, args) => {
    message.channel.startTyping();
    message.react("<a:black:856916288449806346>");
    let bicon = bot.user.displayAvatarURL; //bot avatar
    const embed = new Discord.MessageEmbed()
      .setColor("#2ECC71")
      .setDescription(`**Type:** \`${PREFIX}help\` \n**Click** [HERE](https://discord.com/api/oauth2/authorize?client_id=${bot.user.id}&scope=bot&permissions=805315646) **to invite me to your server.**`)
      .setAuthor(`${bot.user.username} Commands list`, bot.user.displayAvatarURL())
      .setThumbnail(
        message.guild.iconURL({
          dynamic: true,
        })
      )
      .addField(
        "**🛠️Moderation**",
        "`ban`, `deafen`, `disablemodlogchannel`, `disablemuterole`, `disablexp`, `dm`, `kick`, `lock`, `lockdown`, `slowmode`, `unban`, `unlockchannel`, `setexp`, `svr`, `nuke`, `setnick`, `warn`, `resetwarnings`, `undeafen`, `setleavechannel`, `disableleavechannel`,"
      )
      .addField("<a:fun:856916092782116895> **Fun**", "`avatar`, `channel`, `embed`, `roleinfo`, `iconserver`, `snipe`, `timer`, `translate`, `whois`, `emojify`, `sudo`, `calculator`, `joke`, `meme`, `fliptext`, `weather`, `iq`,")
      .addField(":floppy_disk:  **Backups**", " `create-backup`, `info-backup`, `load-backup`,")
      .addField(":tada: **Giveaways**", " `start`, `end`, `reroll` ")
      .addField("<:yo:856916237467910184> **Anime** ", " `animesearch`, `anime`, ")
      .addField(":frame_photo: **Images** ", " `kiss`, `trigger`, `captcha`, `jail`, `cat`, `dog`, `rip`, `avatarfusion`, `slap`, `wanted`, `facepalm`, ")
      .addField(":information_source: **Info**", " `invite`, `uptime`, `serverinfo`, `botinfo`, `corona`, `support`, `warnings`, `channel`, ")
      .addField(":joystick: **Owner** ", " `eval`, `serverlist`, ")
      .addField(":robot: **Smart Bot**", " `setsmartchannel`, `removesmartchannel`, ")
      .addField("🔍 **Search**", " `djs`, `github`, `npm`, `ig`, `samp`, ")
      .addField("<a:stars:858242326836543509>**Suggest**", " `suggest`, `setsuggest`, `reply`, ")
      .addField("<a:black:856916288449806346>  **Utility**", "`prefix`, `ping`,`help`, `bugs`, ")
      .setImage("https://media.discordapp.net/attachments/852818847059804160/857265762095333376/standard_4.gif")
      .setTimestamp()
      .setFooter(`This command requested by ${message.author.username}#${message.author.discriminator}`);
    message.lineReply(embed);
    message.channel.stopTyping();
  },
};
