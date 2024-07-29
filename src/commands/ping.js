import { SlashCommandBuilder } from "discord.js";
import { setTimeout as wait } from "node:timers/promises";

export const command = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong!");

export const action = async (interaction) => {
  interaction.reply("Pong!");
  await wait(2_000);
  interaction.editReply("Nguyen is GAY!");
};
