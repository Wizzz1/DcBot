import { Events } from "discord.js";

export const event = {
  name: Events.InteractionCreate,
};

export const action = async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const action = appStore.commandsActionMap.get(interaction.commandName);

  await action(interaction);
};
