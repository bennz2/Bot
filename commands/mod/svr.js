const { ownerID } = require("../../owner.json");
const db = require("quick.db");
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  config: {
    name: "svr",
    description:
      "Set the server region for the server! \nAvailable Server IDs: \nbz : Brazil, \nhk : HongKong, \nind : India, \njp : Japan, \nrus : Russia, \nsng : Singapore, \nsa : South Africa, \nsyd : Sydney, \nusc : US-Central, \nuse : US-East, \nuss : US-South, \nusw : US-West, \neur : Europe",
    usage: "m/svr <region ID>",
    example: "m/svr jp",
    aliases: ["svr"],
  },
  run: async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD") && !ownerID.includes(message.author.id)) return message.channel.send("You Don't Have Sufficient Permissions!- [MANAGE_GUILD]");

    let serverRegion = args.slice(0).join(" ");
    let memek = new MessageEmbed()
      .setColor("RED")
      .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }), true)
      .setTitle("**Read This**")
      .addField("RegionList", "**Read This To Know Region List**")
      .addField(":flag_white: **RegionList**", " `bz`, `hk`, `ind`, `jp`, `rus`, `sng`, `sa`, `syd`, `usc`, `use`, `uss`, `usw`, `uer` ", true)

      .setFooter(message.member.displayName, message.author.displayAvatarURL(), true)
      .setTimestamp();
    if (!serverRegion) return message.channel.send(memek);
    var availableRegions = ["bz", "hk", "jp", "rus", "sng", "sa", "syd", "ind", "usc", "use", "usw", "uss", "eur"];

    if (availableRegions.includes(serverRegion)) {
      try {
        const serverAliases = {
          bz: "brazil",
          hk: "hongkong",
          ind: "india",
          jp: "japan",
          rus: "russia",
          sng: "singapore",
          sa: "southafrica",
          syd: "sydney",
          usc: "us-central",
          use: "us-east",
          uss: "us-south",
          usw: "us-west",
          eur: "europe",
        };
        await message.guild.setRegion(serverAliases[serverRegion]);
        message.channel.send(`**Done ✅ | Server Region changed to** ${serverAliases[serverRegion]}`);

        let channel = db.fetch(`modlog_${message.guild.id}`);
        if (!channel) return;

        let embed = new MessageEmbed()
          .setColor("RED")
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
          .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
          .addField("**Moderation**", "**Server Region Changes**")
          .addField("**Region**", serverAliases[serverRegion])
          .addField("**Moderator**", message.author.username)
          .addField("**Date**", message.createdAt.toLocaleString())
          .setFooter(message.member.displayName, message.author.displayAvatarURL())
          .setTimestamp();

        var sChannel = message.guild.channels.cache.get(channel);
        if (!sChannel) return;
        sChannel.send(embed);
      } catch (error) {
        console.log(error);
        message.channel.send(`Oops ❌ | An error occured!`);
      }
    } else {
      let ber = new MessageEmbed()
        .setColor("RED")
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }), true)
        .setTitle("❌ Eror Invalid Region Id")
        .addField("RegionList", "**Read This To Know Region List**")
        .addField(":flag_white: **RegionList**", " `bz`, `hk`, `ind`, `jp`, `rus`, `sng`, `sa`, `syd`, `usc`, `use`, `uss`, `usw`, `uer` ", true)

        .setFooter(message.member.displayName, message.author.displayAvatarURL(), true)
        .setTimestamp();
      return message.channel.send(ber);
    }
  },
};
