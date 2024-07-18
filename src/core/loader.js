import {Guild, REST, Routes, Collection} from 'discord.js'
import fg from 'fast-glob'
import { command } from '../commands/ping'
import { config } from '../commands/config'
import {useAppStore} from '@/store/app'

 

const updateSlashCommands = async(commands,guildId) => {  //REST need parameter: what you need?
    const rest = new REST({version:10}).setToken(process.env.TOKEN) 
    const result = await rest.put(
        Routes.applicationGuildCommands(        //fulllRoute
            process.env.APPLICATION_ID,
            guildId,
        ),
        {       //options? only need to upload command定義部份
            body:commands,
        }
    )
    console.log(result)
}

export const loadCommands = async()=>{      //await need a async function 
    const appStore = useAppStore()  //執行function useAppStore(), 回傳appStore
    const commands = []
    const actions = new Collection() 
    const files = await fg('./src/commands/**/index.js')
    
    for(const file of files){
        const cmd = await import(file)      //await 載入file 讀個index.js
        commands.push(cmd.command)
        actions.set(cmd.command.name,cmd.action)
    }

    for(const guildId of config.guildIds){
        console.log('guildID = ',guildId)
        await updateSlashCommands(commands, guildId)
        appStore.commandsActionMap = actions
    }
    console.log(appStore.commandsActionMap)
}

export const loadEvents = async() =>{
    const appStore = useAppStore()
    const client = appStore.client
    const files = await fg('./src/events/**/index.js')
    for(const file of files){
        const eventFile = await import(file)  
        
        if(eventFile.event.once){
            client.once(
                eventFile.event.name,
                eventFile.action
            )
        }else{
            client.on(
                eventFile.event.name,
                eventFile.action
            )
        }
        
    }

}