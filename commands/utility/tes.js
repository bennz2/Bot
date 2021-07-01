const discord = require("discord.js"); // Define the discord.js module
const client = new discord.Client(); // Creating discord.js client (constructor)
require("discord-buttons")(client); // Starting the discord-buttons class
const { MessageButton, MessageActionRow } = require("discord-buttons");

module.exports = {
  config: {
    name: "tes",
    description: "Help Menu",
  },
  run: async (bot, message, args) => {
    const button2 = new MessageButton().setStyle("green").setLabel("hello world").setID("button1");
    message.channel.send("hello", { buttons: [button2] });
  },
};
