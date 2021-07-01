const { Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const moment = require("moment");
const fetch = require("node-fetch");
const url = require("url");
const api = require("covidapi");
const { send } = require("process");

module.exports = {
  config: {
    name: "covid",
    aliases: ["corona"],
    category: "search",
    description: "Covid-19",
    usage: "covid <country>",
    args: true,
  },
  run: async (bot, message, args) => {
    const a = args.join(" ");
    if(!args[0]) return message.channel.send(":warning: ** Pliss Insert Country First** ")
    const data = await api.countries({ country: args.join(" ") });
    const coronaembed = new Discord.MessageEmbed()
      .setColor("#FFFFFF")
      .setTitle("<:download:856807644147482624> **Global Cases Covid-19**")
      .setDescription(`**Number of Covid-19 cases on** \`${a}\``)
      .addField(":desktop: **Cases** ", data.cases)
      .addField(":boy: **Active** ", data.active)
      .addField(":desktop: **Cases Today**", data.todayCases)
      .addField(":warning: **Critical Cases**", data.critical)
      .addField(":pirate_flag: **Deaths** ", data.deaths)
      .addField(":white_flower: **Recovered** ", data.recovered);
    message.channel.send(coronaembed);
  },
};
