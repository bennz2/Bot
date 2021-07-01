const { ownerID } = require("../../owner.json");

module.exports = {
  config: {
    name: "purge",
    aliases: ["clear"],
    category: "moderation",
    description: "Deletes messages from a channel",
    usage: "?purge [amount of messages]",
  },
  run: async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You Don't Have Sufficient Permissions!- [MANAGE_MESSAGES]");
    if (isNaN(args[0])) return message.channel.send("**Please Supply A Valid Amount To Delete Messages!**");

    if (args[0] > 100) return message.channel.send("**Please Supply A Number Less Than 100!**");

    if (args[0] < 1) return message.channel.send("**Please Supply A Number More Than 1!**");

    message.channel
      .bulkDelete(args[0])
      .then((messages) => message.channel.send(`<a:black:856916288449806346>** Succesfully deleted \`${messages.size}/${args[0]}\` messages**`).then((msg) => msg.delete({ timeout: 5000 })))
      .catch(() => null);
  },
};