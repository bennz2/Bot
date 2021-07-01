const ms = require("ms");
const config = require("../../config.json");

module.exports = {
  config: {
    name: "end",
    description: "Ends a giveaway.",
    usage: "",
    category: "Giveaways",
    accessableby: "Admins",
    aliases: [], // To add custom aliases just type ["alias1", "alias2"].
  },
  run: async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES") && !message.member.roles.cache.some((r) => r.name === "Giveaways")) {
      return message.channel.send(":boom: You need to have the `MANAGE_MESSAGES` permissions to end giveaways.");
    }

    if (!args[0]) {
      return message.channel.send(":boom: Uh oh, I couldn't find that message! Try again!");
    }

    let giveaway = bot.giveawaysManager.giveaways.find((g) => g.prize === args.join(" ")) || bot.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    if (!giveaway) {
      return message.channel.send(":boom: Hm. I can't seem to find a giveaway for `" + args.join(" ") + "`.");
    }
    bot.giveawaysManager
      .edit(giveaway.messageID, {
        setEndTimestamp: Date.now(),
      })
      .then(() => {
        message.channel.send("Giveaway will end in less than " + bot.giveawaysManager.options.updateCountdownEvery / 1000 + " seconds...");
      })
      .catch((e) => {
        if (e.startsWith(`Giveaway with message ID ${giveaway.messageID} has already ended.`)) {
          message.channel.send("This giveaway has already ended!");
        } else {
          console.error(e);
          message.channel.send(":x: An error occurred...");
        }
      });
  },
};
