import { Message, RichEmbed, TextChannel } from "discord.js";
import { IS_DEV_MODE } from "../constants";
import ChannelID from "./enums/channel_id";
import RoleID from "./enums/role_id";
import { logDevMessage } from "./logger";

export const reply = (
  message: Message,
  body: RichEmbed | string,
  mentionUser: boolean = false,
) => {
  if (IS_DEV_MODE) {
    logDevMessage(JSON.stringify(body, null, 2));
  } else if (mentionUser) {
    message.reply(body);
  } else {
    message.channel.send(body);
  }
};

export const richReply = (
  message: Message,
  body: string,
  title: string,
  mentionUser: boolean = false,
) => {
  const embed = new RichEmbed()
    .setTitle(
      `:information_source: **${title}**\n===========================\n`,
    )
    .setColor("#0097F4")
    .setDescription(body);

  reply(message, embed, mentionUser);
};

export const channelSend = (channel: TextChannel, message: string) => {
  if (IS_DEV_MODE) {
    logDevMessage(message);
  } else {
    channel.send(message);
  }
};

export const formatChannel = (channelId: ChannelID) => `<#${channelId}>`;

export const formatRole = (roleID: RoleID) => `<@&${roleID}>`;
