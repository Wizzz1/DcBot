import { Client, Events, GatewayIntentBits } from 'discord.js'
import vueInit from '@/core/vue'
import dotenv from 'dotenv'
import { loadCommands,loadEvents } from '@/core/loader'
import { useAppStore } from '@/store/app'

vueInit()  //初始化vue & pinia environment

dotenv.config()  //載入env config

loadCommands()

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const appStore = useAppStore()
appStore.client = client

loadEvents()

// Log in to Discord with your client's token
client.login(process.env.TOKEN);
