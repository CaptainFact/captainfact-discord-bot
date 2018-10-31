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
import { BOT_MSG_PREFIX } from "../constants";
import CommandsHandlers from "./commands_handlers";
import { channelSend, reply } from "./discord_utils";
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
    const commandStr = message.toString();
    const fullCommmand = commandStr.match(/\S+/g) || [];

    // Avoid matching on things like `!CFGFDFSFSDF`
    if (fullCommmand[0] !== BOT_MSG_PREFIX) {
      return;
    }

    // Dispatch command
    const commandFunc = CommandsHandlers[fullCommmand[1]];
    if (!commandFunc) {
      reply(
        message,
        `Commande invalide : \`${commandStr}\`.\nTapez \`!CF help\` pour voir la liste des commandes disponnibles.`,
      );
    } else {
      commandFunc(message, fullCommmand.slice(2));
    }
  }
}
