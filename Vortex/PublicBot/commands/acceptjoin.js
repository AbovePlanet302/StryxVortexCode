const Acceptjoin = {
    name: "Acceptjoin",
    command: "acceptjoin",
    category: "Roblox",
    description: "Accept a group join request.",
    usage: "acceptjoin <roblox id>",
    execute: async function(client, msg, args, embed, guildSettings) {
        if (!guildSettings.roblox.cookie || !guildSettings.roblox.groupid){
            embed.setTitle("Uh oh!")
            embed.setDescription(`A server administrator needs to configure this command. This can be done [here](https://vortexhq.net/servers/${msg.guild.id}/roblox).`)
            embed.setColor("RED")
            return msg.channel.send(embed)
        } else {
            if (!msg.member.roles.cache.has(`${guildSettings.roblox.verification.updaterole}`)) {
                embed.setTitle("Uh oh!")
                embed.setColor(15158332)
                embed.setDescription(`You must have the <@&${guildSettings.roblox.verification.updaterole}> role to use this command!`)
                return msg.channel.send(embed)
            }
        const roblox = require("noblox.js")
        const groupid = guildSettings.roblox.groupid

        try {
            await roblox.setCookie(guildSettings.roblox.cookie)
        } catch {
            embed.setTitle("Uh oh!")
            embed.setDescription(`The Roblox cookie is invalid. This can be fixed [here](https://vortexhq.net/servers/${msg.guild.id}/roblox).`)
            embed.setColor("RED")
            return msg.channel.send(embed)    
        }



        let userid = args[0];

        if(!userid) {
            embed.setTitle("Uh oh!")
            embed.setDescription("Please specify a user ID for the user's join request!")
            embed.setColor("RED")
            return msg.channel.send(embed)
        }
        let username = await roblox.getUsernameFromId(userid)


        roblox.handleJoinRequest(groupid, userid, true)

        embed.setTitle("Got it!")
        embed.setDescription(`I've accepted the join request for **${username}**!`)
        embed.setColor("GREEN")
        msg.channel.send(embed)

        var logchannel = client.channels.cache.get(`${guildSettings.logchannelid}`)

        embed.setTitle("Join Request Accepted")
        embed.setDescription(`<@${msg.author.id}> has accepted **${username}**'s join request!`)
        embed.setColor("GREEN")
    logchannel.send(embed)

    }
    }
}
    module.exports = Acceptjoin