import {Guild, REST, Routes} from 'discord.js'
import fg from 'fast-glob'
import { command } from '../commands/ping'
import { config } from '../commands/config'


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

    

    const commands = []
    const files = await fg('./src/commands/**/index.js')
    for(const file of files){
        const cmd = await import(file)      //await 載入file 讀個index.js
        commands.push(cmd.command)
    }

    for(const guildId of config.guildIds){
        console.log('guildID = ',guildId)
        await updateSlashCommands(commands, guildId)
    }

}