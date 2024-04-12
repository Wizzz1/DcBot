import { Client, Events, GatewayIntentBits } from 'discord.js'
import dotenv from 'dotenv'


const client = new Client({ intents: [GatewayIntentBits.Guilds] });

dotenv.config()

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Log in to Discord with your client's token
client.login(process.env.TOKEN);
