/**
 * Main entrypoint for Discord API interaction.
 */

import Discord, {
  Client,
  GuildChannel,
  GuildMember,
  TextChannel,
} from "discord.js";
import { Message } from "discord.js";
import { BOT_MSG_PREFIX, IS_DEV_MODE } from "../constants";
import showHelp from "./commands/show_help";
import showInfo from "./commands/show_info";
import { channelSend } from "./discord_utils";
import ChannelID from "./enums/channel_id";
import { logInfo } from "./logger";
import render from "./msg_formatter";
import MsgTemplate from "./msg_template";

export default class CaptainFactDiscordClient {
  private client: Client;

  constructor() {
    this.client = new Discord.Client();

    // Connection succeed
    this.client.on("ready", this.onReady);

    // Handle new members
    this.client.on("guildMemberAdd", this.onGuildMemberAdd);

    // Reply to some messages
    this.client.on("message", this.onMessage);
  }

  public start() {
    return this.client.login(process.env.DISCORD_BOT_TOKEN);
  }

  public onReady = () => {
    logInfo(`Logged in as ${this.client.user.tag}!`);
  }

  public onGuildMemberAdd = (member: GuildMember) => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find((ch: GuildChannel) => {
      return ch.id === ChannelID.General;
    });
    // Do nothing if the channel wasn't found on this server
    if (!channel) {
      return;
    }
    // Send the message, mentioning the member
    channelSend(
      channel as TextChannel,
      render(MsgTemplate.welcome, { member }),
    );
  }

  public onMessage = (message: Message) => {
    if (message.author.bot || !message.content.startsWith(BOT_MSG_PREFIX)) {
      return;
    }

    // Split command
    const command =
      message
        .toString()
        .substr(BOT_MSG_PREFIX.length)
        .match(/\S+/g) || [];

    switch (command[0]) {
      case undefined:
      case "help":
        showHelp(message);
        break;
      case "info":
        showInfo(message, command.splice(1));
        break;
      default:
        logInfo(`Unknown command ${command} by ${message.author.tag}`);
    }
  }
}
