const ms = require('ms');

module.exports = {

    description: 'Çekilişi Devam Ettirirsin!',

    options: [
        {
            name: 'çekiliş',
            description: 'Devam edicek çekilişin ID gir!',
            type: 'STRING',
            required: true
        }
    ],

    run: async (client, interaction) => {

        if(!interaction.member.permissions.has('MANAGE_MESSAGES') && !interaction.member.roles.cache.some((r) => r.name === "Giveaways")){
            return interaction.reply({
                content: 'Bir çekilişi devam ettirebilmek için **Mesajları Yönet** yetkisine sahip olman gerekir!',
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

        if (!giveaway.pauseOptions.isPaused) {
            return interaction.reply({
                content: 'Bu çekiliş zaten durdurulmamış!',
                ephemeral: true
            });
        }
        client.giveawaysManager.unpause(giveaway.messageId).then(() => {
  
            interaction.reply('Çekiliş Devam Ettiriliyor!');
        })
        .catch((e) => {
            interaction.reply({
                content: e,
                ephemeral: true
            });
        });

    }
};
