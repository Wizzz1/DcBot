import {
  SlashCommandBuilder,
  ApplicationCommandType,
  EmbedBuilder,
  ChannelType,
} from "discord.js";
import { type } from "node:os";
import { describe } from "node:test";

export const command = new SlashCommandBuilder()
  .setName("dm")
  .setDescription("DM with me")
  .addStringOption((option) =>
    option
      .setName("category")
      .setDescription("The gif category")
      .setRequired(true)
      .addChoices(
        { name: "Play", value: "play" },
        { name: "Eat", value: "eat" }
      )
  )
  .addUserOption((option) =>
    option.setName("target").setDescription("Select a user").setRequired(true)
  )
  .addChannelOption((option) =>
    option
      .setName("channel")
      .setDescription("Select a channel")
      .setRequired(true)
  );

const playWithMe = (member, channel) => {
  return new EmbedBuilder()
    .setAuthor({
      name: member.displayName,
      iconURL: member.avatarURL(),
    })
    .setDescription(`${member} 邀請你加入語音頻道 ${channel}一同遊玩`)
    .setColor(0x4055f5)
    .setTimestamp(new Date());
};
const EatEat = (member, channel) => {
  return new EmbedBuilder()
    .setAuthor({
      name: member.displayName,
      iconURL: member.avatarURL(),
    })
    .setDescription(`${member} 問你食完未\n快啲加入語音頻道 ${channel}一同遊玩`)
    .setColor(0x4055f5)
    .setTimestamp(new Date());
};

export const action = async (interaction) => {
  const target = interaction.options.getUser("target");
  const act = interaction.options.getString("category");
  const sender = interaction.user;
  const channel = interaction.options.getChannel("channel");

  if (target.bot) return;

  if (act == "play") {
    await target.send({ embeds: [playWithMe(sender, channel)] });
    /* await target.send(
      `${sender} invite you to join ${channel} and play with him.`
    ); */
    interaction.reply(`邀請已送到${target}`);
  }
  if (act == "eat") {
    await target.send({ embeds: [EatEat(sender, channel)] });
    interaction.reply(`邀請已送到${target}`);
  }
};
