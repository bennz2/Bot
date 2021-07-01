const Discord = require("discord.js");
const config = require("../../config.json");

const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports = {
    config: {
        name: 'music',
        description: 'Joins and play music with me!',
        usage: '?music <URL/NameOfMusic>',
        aliases: []
    },
    run: async (message, args) => {
        const VoiceChannel = message.member.voice.channel;
    
        if (!voiceChannel) return message.channel.send('You need to be in a channel to use this Command!');
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('You dont have the correct permissions');
        if (!permissions.has('SPRAK')) return message.channel.send('You dont have the correct permissions');
        if (!args.length) return message.channel.send('You need to send the second argument!');
    
        const connection = await voiceChannel.join();
        
        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);
    
            return (videoResult.videos.length > 1) ?  videoResult.videos[0] : null;
        }
    
        const video = await videoFinder(args.join(' '));
    
        if(video){
            const stream = ytdl(video.url, {filer: 'audioonly'});
            connection.play(stream, {seek: 0, volume: 1})
            .on('finish', () =>{
                voiceChannel.leave();
            });
    
            await message.reply(`:thumbsup: Now Playing ***${video.title}***`)
        } else {
            message.channel.send('No video results found');
        }
    }
}