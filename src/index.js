const Discord = require("discord.js");
const client = new Discord.Client({ intents: 32767 });

require("dotenv").config();

client.config = require("./configs/main.json");
client.embeds = require("./configs/embeds.json");

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

["command", "event"].forEach(handler => {
    require(`./handlers/${handler}`) (client, Discord);
})

client.login(process.env.token);