module.exports = (client, interaction) => {

    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return void interaction.reply({
        content: ` \`${interaction.commandName}\` Adında Bir Komut Bulunamadı!`,
        ephemeral: true
    });
  
    command.run(client, interaction);
};