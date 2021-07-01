const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  config: {
    name: "warn",
    description: "warn members",
    usage: "m/warn <mention member/member id> [reason]",
    aliases: [],
  },
  run: async (bot, message, args) => {
    let warnPermErr = new MessageEmbed().setTitle("**User Permission Error!**").setDescription("**Sorry, you don't have permissions to use this! ❌**");
    if (!message.channel.permissionsFor(message.member).has(["MANAGE_MESSAGES"])) return message.channel.send(warnPermErr);

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) return message.reply("USAGE: ?warn <Mention member/Member ID> [Reason]");

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "(No Reason Provided)";

    member.send(`You have been warned by <${message.author.username}> for this reason: ${reason}`).catch((error) => message.channel.send(`Sorry <${message.author}> I couldn't n't warn because of : ${error}`));
    let warnEmbed = new MessageEmbed()
      .setTitle("**__Warn Report__**")
      .setDescription(`**<@${member.user.id}> has been warned by <@${message.author.id}>**`)
      .addField(`**Reason:**`, `\`${reason}\``)
      .addField(`**Action:**`, `\`Warn\``)
      .addField(`**Moderator:**`, `${message.author}`);

    let warnings = db.get(`warnings_${message.guild.id}_${member.id}`);
    if (warnings === 3) {
      return message.channel.send(`${message.mentions.members.first().username} already reached his/her limit with 3 warnings`);
    }
    if (warnings === null) {
      db.set(`warnings_${message.guild.id}_${member.id}`, 1);
      member.send(`You have been warned in **${message.guild.name}** for ${reason}`);
      await message.channel.send(warnEmbed); //DO NOT FORGET TO USE ASYNC FUNCTION
    } else if (warnings !== null) {
      db.add(`warnings_${message.guild.id}_${member.id}`, 1);
      member.send(`You have been warned in **${message.guild.name}** for ${reason}`);
      await message.channel.send(warnEmbed); //DO NOT FORGET TO USE ASYNC FUNCTION
    }
  },
};
