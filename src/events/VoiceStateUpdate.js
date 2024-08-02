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

//@Johnny Lui JohnnyLui0405
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
    .setDescription(`${member} 跳出了語音頻道 ${channel}`)
    .setColor(0xf04848)
    .setTimestamp(new Date());
};

const mute = (member) => {
  return new EmbedBuilder()
    .setAuthor({
      name: member.displayName,
      iconURL: member.user.avatarURL(),
    })
    .setDescription(`${member} is muted`)
    .setColor(0xfd7f20)
    .setTimestamp(new Date());
};

const unmute = (member) => {
  return new EmbedBuilder()
    .setAuthor({
      name: member.displayName,
      iconURL: member.user.avatarURL(),
    })
    .setDescription(`${member} is unmuted`)
    .setColor(0x25c0c0)
    .setTimestamp(new Date());
};

export const action = async (oldState, newState) => {
  if (newState.member.bot) return;

  const recordChannel = await oldState.client.channels.fetch(
    "1267524958796513280"
  );

  if (oldState.channel == null && newState.channel != null) {
    console.log(
      `${newState.member.displayName} new join channel${newState.channel.name}`
    );

    await recordChannel.send({
      embeds: [joinEmbed(newState.member, newState.channel)],
    });
  }

  if (oldState.channel != null && newState.channel == null) {
    console.log(
      `${newState.member.displayName} last left ${oldState.channel.name}`
    );
    await recordChannel.send({
      embeds: [leftEmbed(oldState.member, oldState.channel)],
    });
  }

  if (oldState.channel != null && newState.channel != null) {
    if (oldState.channel.id != newState.channel.id) {
      console.log(
        `${newState.member.displayName} left ${oldState.channel.name} and join channel${newState.channel.name}`
      );
      await recordChannel.send({
        embeds: [leftEmbed(oldState.member, oldState.channel)],
      });

      await recordChannel.send({
        embeds: [joinEmbed(newState.member, newState.channel)],
      });
    }
  }

  if (oldState.mute == false && newState.mute == true) {
    console.log(`${oldState.member.displayName} muted`);

    await recordChannel.send({
      embeds: [mute(oldState.member)],
    });
  }
  if (oldState.mute == true && newState.mute == false) {
    console.log(`${newState.member.displayName} unmuted`);

    await recordChannel.send({
      embeds: [unmute(newState.member)],
    });
  }
};
