const ms = require('ms');
const messages = require("../utils/messages");

module.exports = {

    description: 'Bir çekiliş başlatırsın!',

    options: [
        {
            name: 'zaman',
            description: 'Çekilişin Süresi Ne Kadar Olucak? Örnek: 1s 1d 1h',
            type: 'STRING',
            required: true
        },
        {
            name: 'kazanan',
            description: 'Kaç tane kazanan olucak?',
            type: 'INTEGER',
            required: true
        },
        {
            name: 'Ödül',
            description: 'Çekilişin Ödülü Ne Olucak?',
            type: 'STRING',
            required: true
        },
        {
            name: 'kanal',
            description: 'The channel to start the giveaway in',
            type: 'KANAL',
            required: true
        }
    ],

    run: async (client, interaction) => {


        if(!interaction.member.permissions.has('MANAGE_MESSAGES') && !interaction.member.roles.cache.some((r) => r.name === "Giveaways")){
            return interaction.reply({
                content: 'Bir çekiliş başlatabilmek için **Mesajları Yönet** yetkisine sahip olman gerekiyor!',
                ephemeral: true
            });
        }
    
        const giveawayChannel = interaction.options.getChannel("kanal");
        const giveawayDuration = interaction.options.getString('zaman');
        const giveawayWinnerCount = interaction.options.getInteger('kazanan');
        const giveawayPrize = interaction.options.getString('Ödül');
        
        if(!giveawayChannel.isText()) {
            return interaction.reply({
                content: 'Seçilen kanal bir yazı kanal değil!',
                ephemeral: true
            });
        }
    
        client.giveawaysManager.start(giveawayChannel, {
            duration: ms(giveawayDuration),
            prize: giveawayPrize,
            winnerCount: giveawayWinnerCount,
            hostedBy: client.config.hostedBy ? interaction.user : null,
            messages
        });
    
        interaction.reply(`Çekiliş ${giveawayChannel} Kanalında Başlatıldı!`);
    
    } 

};
