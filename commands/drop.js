const messages = require("../utils/messages");

module.exports = {

    description: 'Drop Çekiliş Oluşturursun!',

    options: [
        {
            name: 'Kazanan Sayısı',
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
            name: 'Kanal',
            description: 'Çekiliş Hangi Kanalda Olucak?',
            type: 'KANAL',
            required: true
        }
    ],

    run: async (client, interaction) => {

       
        if(!interaction.member.permissions.has('MANAGE_MESSAGES')) {
            return interaction.reply({
                content: 'Bir çekiliş oluşturabilmek için **Mesajları Yönet** yetkisine sahip olman gerekiyor!',
                ephemeral: true
            });
        }
    
        const giveawayChannel = interaction.options.getChannel('Kanal');
        const giveawayWinnerCount = interaction.options.getInteger('Kazanan Sayısı');
        const giveawayPrize = interaction.options.getString('Ödül');
    
        if(!giveawayChannel.isText()) {
            return interaction.reply({
                content: 'Seçilen Kanal Bir Yazı Kanalı Değil!',
                ephemeral: true
            });
        }

      
        client.giveawaysManager.start(giveawayChannel, {

            winnerCount: giveawayWinnerCount,
         
            prize: giveawayPrize,
            
            hostedBy: client.config.hostedBy ? interaction.user : null,
         
            isDrop: true,
       
            messages
        });
    
        interaction.reply(`Çekiliş ${giveawayChannel} Kanalında Oluşturuldu!`);

    }
};
