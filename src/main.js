import { Client, GatewayIntentBits } from "discord.js"
import dotenv from "dotenv"
import { loadCommands, loadEvents } from "./core/loader.js"

//import mongoose, { mongoose } from 'mongoose'

dotenv.config() //載入env config

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.DirectMessagePolls,
  ],
})

loadCommands(client)

loadEvents(client)

// Log in to Discord with your client's token
client.login(process.env.TOKEN)
