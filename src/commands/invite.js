module.exports = {
    name: "invite",
    description: "Sends the bot invite link.",
    options: [],
    botPermissions: [],
    async execute(interaction, client, Discord) {
        try {
            const invite = new Discord.MessageEmbed()
                .setColor(client.embeds.color)
                .setDescription("Click the button below to invite me.")

            const inviteButton = new Discord.MessageActionRow()
                .addComponents (
                    new Discord.MessageButton()
                        .setStyle("LINK")
                        .setLabel("Invite")
                        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=84992&scope=bot%20applications.commands`)
                )

            await interaction.editReply({ embeds: [invite], components: [inviteButton] });
        } catch(err) {
            client.logCommandError(interaction, Discord);
        }
    }
}