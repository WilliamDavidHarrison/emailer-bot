module.exports = (client) => {
    const loadCommands = require("../helpers/loadCommands");

    loadCommands(client);

    const emoji = require("../configs/emojis.json");

    client.logCommandError = async function(interaction, Discord) {
        const error = new Discord.MessageEmbed()
            .setColor(client.embeds.errorColor)
            .setDescription(`${emoji.error} An error occurred!`)

        await interaction.editReply({ embeds: [error] });
    }

    require("dotenv").config();
}