module.exports = {

    description: 'Bir çekilişin kazananını tekrar belirlersin!',

    options: [
        {
            name: 'çekiliş',
            description: "Reroll Atılıcak Çekilişin ID Gir!",
            type: 'STRING',
            required: true
        }
    ],
    
    run: async (client, interaction) => {

        if(!interaction.member.permissions.has('MANAGE_MESSAGES') && !interaction.member.roles.cache.some((r) => r.name === "Giveaways")){
            return interaction.reply({
                content: 'Bir çekilişin kazananı tekrar belirlemek için **Mesajları Yönet** yetkisine sahip olman gerekir!',
                ephemeral: true
            });
        }

        const query = interaction.options.getString('çekiliş');


        const giveaway = 

            client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) ||
            client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);


        if (!giveaway) {
            return interaction.reply({
                content: 'Böyle bir çekiliş bulunamadı!',
                ephemeral: true
            });
        }

        if (!giveaway.ended) {
            return interaction.reply({
                content: 'Bu çekiliş henüz sona ermemiş!',
                ephemeral: true
            });
        }


        client.giveawaysManager.reroll(giveaway.messageId).then(() => {

            interaction.reply('Çekiliş Tekrar Çekildi!');
        })
        .catch((e) => {
            interaction.reply({
                content: e,
                ephemeral: true
            });
        });

    }
};
