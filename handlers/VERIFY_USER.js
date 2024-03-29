const {
    ActionRowBuilder,
    ButtonBuilder
} = require('discord.js');

exports.run = async (client, interaction, member) => {
    let threadName = interaction.channel.name.split(" | ")
    if (threadName.length != 2) return

    // Check if the current member is a verifier
    if (!member.roles.cache.has(process.env.VERIFIERS)) return interaction.reply({
        content: "You are not a verifier",
        ephemeral: true
    })

    // Check the message button count
    if (interaction.message.components[0].components[0].data.custom_id == "VERIFY_USER" && interaction.message.content) {
        interaction.message.edit({
            components: [
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder({})
                    .setCustomId(`VERIFIER_ACTIONS`)
                    .setLabel("Verifier Actions (Staff Only)")
                    .setStyle(4),
                ).addComponents(
                    new ButtonBuilder({})
                    .setCustomId(`MENTION_VERIFIERS|1`)
                    .setLabel("I Need Help Please.")
                    .setDisabled(true)
                    .setStyle(2),
                ).addComponents(
                    new ButtonBuilder({})
                    .setCustomId(`MENTION_VERIFIERS|2`)
                    .setLabel("Finished Answering!")
                    .setDisabled(true)
                    .setStyle(3),
                )
            ]
        })

        return interaction.reply({
            content: "This action was not performed as the embed buttons were on a older version. Please try again with the new buttons.",
            ephemeral: true
        })
    }else {
        let guildMember = await interaction.guild.members.fetch(threadName[1]);
        if (!guildMember) return interaction.reply({
            content: "Member is no longer apart of guild.",
            ephemeral: true
        })
    
        let role = await interaction.guild.roles.fetch(process.env.VERIFIED_ROLE);
    
        // Add the verified role to the user
        guildMember.roles.add(role)
    
        await interaction.reply({
            content: `<@${threadName[1]}> has been verified`,
            allowedMentions: {
                users: [client.user.id],
            }
        })
    
        // Archive the thread
        interaction.channel.setArchived(true, "Archived by verifier")
    
        let randomMessage = [
            "say hello to you new best friend {user}!",
            "everyone wake up {user} joined!",
            "don't get too surprised but... {user} is here!",
            "your wish came true! {user} was verified!",
        ]
    
        let randomImage = [
            "https://cdn.discordapp.com/attachments/960315252044603413/978873384425369700/Dutch.png",
            "https://cdn.discordapp.com/attachments/960315252044603413/978873384790261780/Esperanto.png",
            "https://cdn.discordapp.com/attachments/960315252044603413/978873385025175602/Filipino.png",
            "https://cdn.discordapp.com/attachments/960315252044603413/978873385264234507/French.png",
            "https://cdn.discordapp.com/attachments/960315252044603413/978873385553645608/German.png",
            "https://cdn.discordapp.com/attachments/960315252044603413/978873385872404571/Greek.png",
            "https://cdn.discordapp.com/attachments/960315252044603413/978873386107281418/Korean.png",
            "https://cdn.discordapp.com/attachments/960315252044603413/978873386354761779/Russian.png",
            // "https://cdn.discordapp.com/attachments/960315252044603413/978873386598023188/Spanish.png"
        ]
    
        let randomEmoji = [
            ":heart:",
            ":magic_wand:",
            ":people_hugging:",
            ":dolphin:",
            ":confetti_ball:",
            ":tada:",
            ":pushpin:",
            ":chart_with_upwards_trend:",
            ":sparkles:",
            ":golf:"
        ]
    
        let randomFact = [
            "Some potatoes are poisonous.",
            "Most dirt isn't edible.",
            "Walls are often made with bricks, but clay can also be used.",
            "Mixing apple juice and Toothpaste would most likely taste bad.",
            "Soup cans are often repurposed to create homes for small animals such as rats.",
            "Some humans have been able to learn the language spoken by orange species of fish.",
            "Pluto's surface contains plutonium, which tastes like fruit if consumed in the vacuum of space.",
            "Pasta is not a good way to glue things.",
            "Nasa is developing a new form of spacesuit which aims to prevent you from entering the playground after 9pm.",
            "If you mess up drinking water, you may suffocate.",
            "All animals can fly, but some only once.",
            "Drinking water at 10pm while saying \"Your cute\" to all your best friends can cause you to become cute yourself.", ,
            "Penelopie with an \"i\" is a cute name.",
            "Using your shoe as a flower pot could actually work.",
            "Using your shoes as a flower pot means you can't use them to walk anymore.",
            "Waking up in the morning is the best way to start your day.",
            "We love you for who you are. :max_heart:",
            "Sometimes I sleep outside.",
            "You always dream about yourself on Tuesdays.",
            "Zebras have stripes to make tigers hurt themselves in their confusion.",
            "If beans contain soy, then why are you made of hummus?",
            "Monday is often considered the first day of the week.",
            "We are made of Mayonnaise if you dig deep enough.",
            "November is the month you were born in, even if you don't realize it.",
            "If you weigh 49.5kg and eat 500g of m&ms, you are 1% m&m.",
            "Green is not a real color, instead it is made up of combining orange and greenish blue.",
            "In each and every marriage lives a gerbil.",
            "My favorite fruit is strawberries.",
            "Your pets have business meetings while you sleep.",
            "Clouds cannot be walked on in real life.",
            "Tetris is a game about finding the good in humanity.",
            "\" Don't believe the source of every quote\" - Albert Einstein",
            "Bats can read your mind and comfort you in times of need.",
            "Weeds grow in your backyard even if you ask them not to.",
            "Your sleeping right now, wake up.",
            "If the Matrix can be created in real life, you are probably in one right now.",
            "Zebras are only black and white because they cannot see in color and therefore couldn't make another decision.",
            "Some Pans cannot be used to cook.",
            "If you golf with your hands, you can't bake cakes.",
            "Being left handed is something to be proud of.",
            "Having a guide dog for being colorblind is not a good idea.",
            "Math is just a distraction to make you not notice the rats in your back yard.",
            "Cats cannot tell you their favorite color as they cannot speak.",
            "You forget how to walk if you try and think about how you walk while walking.",
            "Submitting a pull request is the best way to confess your love to your significant other.",
            "Sometimes I want to pick flowers by the sand, but they won't let me.",
            "I can't hear you, but I also don't have ears.",
            "Opening the pickle jar can cause you to eat pickles inadvertently.",
            "V8 Juice is made up of green things.",
            "Vegetables are kinda icky.",
            "I really wish you would stop texting me at 3am.",
            "I'm hungry... Are you?",
            "Stop, Drop, and Roll if you ever feel the need to stretch your legs.",
            "Floor tiles can not solve all your problems.",
            "Cute people will make you smile.",
            "The popular song in Phineas and Ferb, squirrel in my pants: is about someone with squirrels in their pants.",
            "The length of Great Britain's coastline remains a mystery.",
            "Giving a door as a birthday gift may not give you the expected response.",
            "Fire is often fairly warm.",
            "TransPlace placed trans on place.",
            "These quotes aren't all true.",
            "I am never gonna give you up.",
            "Mathematicians warn we may run out of natural numbers by the end of the century.",
            "Magnets become less attractive and more repulsive after having children.",
            "Earth’s Magnetic Field can be restarted with nuclear bombs.",
            "Magnets become stronger in the cold because they shiver.",
            "Most potatoes are farmed underground.",
            "Yellow golf balls have been found to be made of golf balls.",
            "Some plants and trees grow upside down.",
            "Money is actually just paper with emotional value.",
            "Saté sauce is often made from simple peanut butter in home recipes.",
            "The UK has a large population so sometimes we have to live in the UK.",
            "The average person walks the equivalent of a mile in their lifetime.",
            "Magnetism is a phenomenon that occurs when two or more atoms are attracted to each other.",
            "Sometimes we see things from the past, sometimes things from the future.",
            "Often yellow things are made of yellow things.",
        ]
    
        client.channels.cache.get(process.env.WELCOME_CHANNEL).send({
            content: "<@&978861945253945394>, " + randomMessage[Math.floor(Math.random() * randomMessage.length)].replace("{user}", `<@${threadName[1]}>`),
            embeds: [{
                "title": "Welcome to TransPlace, a place for trans people. " + randomEmoji[Math.floor(Math.random() * randomEmoji.length)],
                "description": "**Welcome** {user}**! We're glad to finally meet you!**\n*Why don't you check out some of the channels below to get started?*\n\n<#964333907447250975> - Read the Rules!\n<#964279302877241375> - Assign some Roles!\n<#964221571071869050> - Introduce Yourself!".replace("{user}", `<@${threadName[1]}>`),
                "color": 16119285,
                "footer": {
                    "text": "Did you know? : " + randomFact[Math.floor(Math.random() * randomFact.length)]
                },
                "image": {
                    "url": randomImage[Math.floor(Math.random() * randomImage.length)]
                }
            }],
        })
    
        let logMessage = await client.channels.cache.get(process.env.LOGS).send({
            content: `<@${interaction.user.id}> verified <@${threadName[1]}>.`,
            allowedMentions: {
                users: [client.user.id],
            }
        })
    }

}

exports.data = {}