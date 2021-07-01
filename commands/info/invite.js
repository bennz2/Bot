const Discord = require("discord.js");
const client = new Discord.Client(); // Creating discord.js client (constructor)
require("discord-buttons")(client); // Starting the discord-buttons class
const { MessageButton, MessageActionRow } = require("discord-buttons");

module.exports = {
  config: {
    name: "invite",
    description: "Invite Me To You Server",
    usage: "invite",
    aliases: [],
  },
  run: async (bot, message, args) => {
    const button2 = new MessageButton().setStyle("url").setLabel("hello world").setURL("pepek.com").setID("button2");
    message.channel.send("hello", { buttons: [button2] });
  },
};
