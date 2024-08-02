import { SlashCommandBuilder, Message, Client } from "discord.js"

export const command = new SlashCommandBuilder()
  .setName("dm")
  .setDescription("DM with me")
  .addUserOption((option) =>
    option.setName("target").setDescription("Select a user").setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("input")
      .setDescription("Write what u want to send.")
      .setRequired(true)
  )

export const action = async (interaction) => {
  //const sender = interaction.member
  const target = interaction.options.getUser("target")
  const input = interaction.options.getString("input")
  const user = interaction.user

  await target.send(`${user} sent this to you \n${input}`)
  interaction.reply(`Sent Successfully\n${input} have been sent to ${target}`)
}
