import { Events } from "discord.js";
import { EmbedBuilder } from "discord.js";
import { VoiceState, userMention, MessageFlags } from "discord.js";
import { mongo } from "mongoose";

export const event = {
  name: Events.VoiceStateUpdate,
  once: false, //如果想once: True; Not once: false
};

export const joinEmbed = (member, channel) => {
  const joinEmbed = new EmbedBuilder()
    .setAuthor({
      name: member.displayName,
      iconURL: member.user.avatarURL(),
    })
    .setDescription(`${member} 跳進了語音頻道 ${channel}`)
    .setColor(0x44b37f)
    .setTimestamp(new Date());
  return joinEmbed;
};

export const leftEmbed = (member, channel) => {
  const leftEmbed = new EmbedBuilder()
    .setAuthor({
      name: member.displayName,
      iconURL: member.user.avatarURL(),
    })
    .setDescription(`${member} 離開了語音頻道 ${channel}`)
    .setColor(0x44b37f)
    .setTimestamp(new Date());
  return Embed;
};
