import { REST, Routes, Collection } from "discord.js";
import { config } from "../utils/config.js";
import fg from "fast-glob";

const updateSlashCommands = async (commands, guildId) => {
  const rest = new REST({ version: 10 }).setToken(process.env.TOKEN);
  const result = await rest.put(
    Routes.applicationGuildCommands(
      //fulllRoute
      process.env.APPLICATION_ID,
      guildId
    ),
    {
      body: commands,
    }
  );
  console.log(result);
};

export const loadCommands = async (client) => {
  const commands = [];
  client.commands = new Collection();
  const files = await fg("./src/commands/**.js");

  for (const file of files) {
    const cmd = await import("../../" + file);
    commands.push(cmd.command);
    client.commands.set(cmd.command.name, cmd.action);
  }

  for (const guildId of config.guildIds) {
    console.log("guildID = ", guildId);
    await updateSlashCommands(commands, guildId);
  }
};

export const loadEvents = async (client) => {
  const files = await fg("./src/events/**.js");
  for (const file of files) {
    const eventFile = await import("../../" + file);
    if (eventFile.event.once) {
      client.once(eventFile.event.name, eventFile.action);
    } else {
      client.on(eventFile.event.name, eventFile.action);
    }
  }
};
