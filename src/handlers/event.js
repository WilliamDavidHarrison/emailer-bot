module.exports = (client, Discord) => {
    const loadEvents = require("../helpers/loadEvents");

    loadEvents(client, Discord);

    const emoji = require("../configs/emojis.json");

    client.logInteractionEventError = async function(interaction, Discord) {
        const error = new Discord.MessageEmbed()
            .setColor(client.embeds.errorColor)
            .setDescription(`${emoji.error} There was an error while executing that command!`)

        await interaction.editReply({ embeds: [error] });
    }
}