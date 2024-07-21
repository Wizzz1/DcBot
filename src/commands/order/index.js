import { SlashCommandBuilder } from "discord.js"

export const data = new SlashCommandBuilder()
  .setName("order")
  .setDescription("Order your food and drink")
  .addStringOption((option) =>
    option.setName("food").setDescription("Enter your food").setRequired(true)
  )
  .addStringOption((option) =>
    option.setName("drink").setDescription("Enter your drink").setRequired(true)
  )

export const command = data.toJSON()

export const action = async (interaction) => {
  const food = interaction.options.getString("food")
  const drink = interaction.options.getString("drink")
  interaction.reply(`You ordered ${food} and ${drink}`)
}
