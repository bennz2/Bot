const Discord = require("discord.js");
const colors = require("../../colors.json");
const malScraper = require("mal-scraper");
const Kitsu = require("kitsu.js");
const kitsu = new Kitsu();

module.exports = {
  config: {
    name: "animesearch",
    aliases: ["animsearch", "requestanime"],
  },
  run: async (bot, message, args) => {
    var search = message.content.split(/\s+/g).slice(1).join(" ");
    if (!args[0])
      return message.lineReply({
        embed: {
          color: 16734039,
          description: "❌ | Please Enter The Anime Movie !",
        },
      });
    kitsu
      .searchAnime(search)
      .then(async (result) => {
        if (result.length === 0)
          return message.lineReply({
            embed: {
              color: 16734039,
              description: ":cry: | Sorry This is not a valid anime movie!",
            },
          });

        let anime = result[0];
        const embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setAuthor(`${anime.titles.english ? anime.titles.english : search} | ${anime.showType}`, anime.posterImage.original)
          .setDescription(anime.synopsis.replace(/<[^>]*>/g, "").split("\n")[0])
          .addField("❯ Information", `•**Japanese Name:** ${anime.titles.romaji}\n•**Age Rating:** ${anime.ageRating}\n\•`, true)
          .addField("❯ Stats", `•**Avg Rating:** ${anime.averageRating}\n\•**Rank by rating:** ${anime.ratingRank}\n\•**Rank by popularity:** ${anime.popularityRank}`, true)
          .addField("❯ Status", `•**Episode Count:** ${anime.episodeCount ? anime.episodeCount : "N/A"}\n\•**Start Date:** ${anime.startDate}`, true)
          .setThumbnail(anime.posterImage.original, 100, 200);
        return message.channel.send(embed);
      })
      .catch((err) => {
        console.log(err);
        return message.channel.send(`:( Sorry Couldn't find result for ${search}`);
      });
  },
};
