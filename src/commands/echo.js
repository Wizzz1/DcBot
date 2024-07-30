import { SlashCommandBuilder } from "discord.js";

export const command = new SlashCommandBuilder()
  .setName("echo")
  .setDescription("Replies with your input!")
  .addStringOption((option) =>
    option
      .setName("input")
      .setDescription("The input to echo back")
      .setRequired(true)
  )

  .addMentionableOption((option) =>
    option
      .setName("mentionable")
      .setDescription("Mention something")
      .setRequired(true)
  )
  .addUserOption((option) =>
    option.setName("target").setDescription("Select a user").setRequired(true)
  );

export const action = async (interaction) => {
  const input = interaction.options.getString("input");
  const user = interaction.options.getUser("target");
  const tag = interaction.options.getMentionable("mentionable");

  //interaction.reply(user)
  interaction.reply(
    `${input} ${tag}\nUsername: ${user.username}\nID: ${user.id}`
  );
  console.log("done");
};
