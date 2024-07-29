import{SlashCommandBuilder} from 'discord.js'

export const command = new SlashCommandBuilder()
.setName('ping')
.setDescription('Replies with Pong!')


export const action = async(interaction) =>{
    const wait = require('node:timers/promises').setTimeout;
    interaction.reply('Pong!')
    await wait(2_000);
	 interaction.editReply('Nguyen is GAY!');

}