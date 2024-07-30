import { Events } from "discord.js";

export const event = {
  name: Events.InteractionCreate,
};

export const action = async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const client = interaction.client;
  const execute = client.commands.get(interaction.commandName);

  console.log(
    `${interaction.member.displayName}(${interaction.member.id}) executing command ${interaction.commandName}`
  );

  await execute(interaction);
};
