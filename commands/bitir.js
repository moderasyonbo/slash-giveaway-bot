const ms = require('ms');

module.exports = {

    description: 'Çekilişi Bitirirsin!',

    options: [
        {
            name: 'çekiliş',
            description: 'Sonlandırılıcak çekilişin ID girmelisin!',
            type: 'STRING',
            required: true
        }
    ],

    run: async (client, interaction) => {

       
        if(!interaction.member.permissions.has('MANAGE_MESSAGES') && !interaction.member.roles.cache.some((r) => r.name === "Giveaways")){
            return interaction.reply({
                content: 'Bir çekilişi bitirebilmek için **Mesajları Yönet** yetkisine sahip olman gerekir!',
                ephemeral: true
            });
        }

        const query = interaction.options.getString('çekiliş');


        const giveaway = 
            client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) ||
            client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);

       
        if (!giveaway) {
            return interaction.reply({
                content: "Böyle bir çekiliş bulunamadı!",
                ephemeral: true
            });
        }

        if (giveaway.ended) {
            return interaction.reply({
                content: 'Bu çekiliş zaten sona ermiş!',
                ephemeral: true
            });
        }

   
        client.giveawaysManager.end(giveaway.messageId).then(() => {
            interaction.reply('Çekiliş Sona Erdi!');
        })
        .catch((e) => {
            interaction.reply({
                content: e,
                ephemeral: true
            });
        });

    }
};
