const config = require('../config.json');

module.exports = {
    giveaway: (config.everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 **ÇEKİLİŞ BAŞLATILDI!!** 🎉🎉",
    giveawayEnded: (config.everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 **ÇEKİLİŞ SONA ERDİ!!** 🎉🎉",
    inviteToParticipate: "Katılmak için 🎉 tepkisine basın!",
    dropMessage: "Kazanabilmek için ilk siz 🎉 tepkisine basın!",
    drawing: 'Kalan Süre: {timestamp}',
    winMessage: "Tebrikler, {winners}! Sen **{this.prize}** Kazandın!",
    embedFooter: "Nova Botlist Çekiliş Sistemi",
    noWinner: "Çekiliş Yeterli Katılımcıya Erişemedi!",
    hostedBy: "Düzenleyen: {this.hostedBy}",
    winners: "Kazanan:",
    endedAt: "Nova Botlist Çekiliş Sistemi"
};
