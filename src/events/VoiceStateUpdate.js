import {
  Events,
  EmbedBuilder,
  VoiceState,
  userMention,
  MessageFlags,
  time,
} from "discord.js";

export const event = {
  name: Events.VoiceStateUpdate,
  once: false, //如果想once: True; Not once: false
};

const joinEmbed = (member, channel) => {
  return new EmbedBuilder()
    .setAuthor({
      name: member.displayName,
      iconURL: member.user.avatarURL(),
    })
    .setDescription(`${member} 跳進了語音頻道 ${channel}`)
    .setColor(0x44b37f)
    .setTimestamp(new Date());
};

const leftEmbed = (member, channel) => {
  return new EmbedBuilder()
    .setAuthor({
      name: member.displayName,
      iconURL: member.user.avatarURL(),
    })
    .setDescription(`${member} 離開了語音頻道 ${channel}`)
    .setColor(0x44b37f)
    .setTimestamp(new Date());
};

export const action = async (oldState, newState) => {
  if (newState.member.bot) return;

  const recordChannel = await oldState.client.channels.fetch(
    "443331812379590658"
  );

  if (oldState.channel == null && newState.channel != null) {
    console.log("join channel");

    await recordChannel.send({
      embeds: [joinEmbed(newState.member, newState.channel)],
    });
  }

  if (oldState.channel != null && oldState.channel == null) {
    console.log("left channel");
    await recordChannel.send({
      embeds: [leftEmbed(oldState.member, oldState.channel)],
    });
  }
};
