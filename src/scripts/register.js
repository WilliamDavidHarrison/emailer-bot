const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("node:fs");

require("dotenv").config();

const clientId = process.env.clientId;

const commands = [];

const commandFiles = fs.readdirSync(`./src/commands`).filter(file => file.endsWith(".js"));

for(const file of commandFiles) {
    const command = require(`../commands/${file}`);

    commands.push(command);
}

const rest = new REST({ version: "9" }).setToken(process.env.token);

(async () => {
	try {
		console.log(`Registering Global Commands!`);

		await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );

		console.log(`Registered Global Commands!`);
	} catch(err) {
		console.error(err);
	}
})();