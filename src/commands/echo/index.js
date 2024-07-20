const { SlashCommandBuilder } = require('discord.js');

export const data = new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Replies with your input!')
    .addStringOption(option =>
        option.setName('input')
            .setDescription('The input to echo back'))
    .addStringOption(option =>
        option.setName('prefix')
            .setDescription('A prefix to add to the echoed message'));       

export const command = data.toJSON();

export const action = async (interaction) => {
    const input = interaction.options.getString('input');
    const prefix = interaction.options.getString('prefix') || '';
    if (!input) {
        await interaction.reply('Please provide some text to echo!');
    } 
    if(prefix){
        await interaction.reply(`${prefix}${input}`);
    } else {
        await interaction.reply(input);
    }
};