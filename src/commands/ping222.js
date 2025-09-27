import { SlashCommandBuilder } from "discord.js";

export const command = new SlashCommandBuilder()
  .setName("ping222")
  .setDescription("Replies with Pong!");

export const action = async (interaction) => {
  interaction.reply("Pong!");
};
