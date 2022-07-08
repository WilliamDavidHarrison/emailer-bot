const fs = require("fs");

module.exports = {
    name: "help",
    description: "Displays a list of all of my commands.",
    options: [],
    botPermissions: [],
    async execute(interaction, client, Discord) {
        try {
            const commands = [];

            const commandFiles = fs.readdirSync(`./src/commands`).filter(file => file.endsWith(".js"));

            for(const file of commandFiles) {
                const command = require(`../commands/${file}`);

                if(command.name) {
                    commands.push(command.name);
                } else {
                    continue;
                }
            }

            const help = new Discord.MessageEmbed()
                .setColor(client.embeds.color)
                .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
                .setTitle("Help")
                .setDescription(`\`${commands.join("\`, \`")}\``)
                .setTimestamp()

            const buttons = new Discord.MessageActionRow()
                .addComponents (
                    new Discord.MessageButton()
                        .setStyle("LINK")
                        .setLabel("Invite")
                        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=84992&scope=bot%20applications.commands`)
                )

            await interaction.editReply({ embeds: [help], components: [buttons] });
        } catch(err) {
            client.logCommandError(interaction, Discord);
        }
    }
}