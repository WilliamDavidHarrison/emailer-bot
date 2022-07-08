const nodemailer = require("nodemailer");
const emoji = require("../configs/emojis.json");

module.exports = {
    name: "email",
    description: "Send an email.",
    options: [
        {
            type: 3,
            name: "email",
            description: "The email address to send the email.",
            required: true
        },

        {
            type: 3,
            name: "subject",
            description: "The subject of the email.",
            required: true
        },

        {
            type: 3,
            name: "message",
            description: "The body of the email.",
            required: true
        }
    ],
    botPermissions: [],
    async execute(interaction, client, Discord) {
        try {
            async function email() {
                let transporter = nodemailer.createTransport({
                    host: process.env.host,
                    port: process.env.port,
                    secure: false,
                    auth: {
                    user: process.env.auth_user,
                    pass: process.env.auth_pass,
                    }
                })

                await transporter.sendMail({
                    from: '"Emailer Bot" <emailer@bot.williamharrison.dev>',
                    to: interaction.options.getString("email"),
                    subject: interaction.options.getString("subject"),
                    text: interaction.options.getString("message")
                })

                const sent = new Discord.MessageEmbed()
                    .setColor(client.embeds.color)
                    .setDescription(`${emoji.successful} Email Sent!`)

                await interaction.editReply({ embeds: [sent] });
                return;
            }

            await email();
        } catch(err) {
            client.logCommandError(interaction, Discord);
        }
    }
}