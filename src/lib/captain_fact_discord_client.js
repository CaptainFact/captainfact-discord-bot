/**
 * Main entrypoint for Discord API interaction.
 */

import Discord from 'discord.js';
import { logInfo } from './logger';
import { IS_DEV_MODE } from '../constants';
import render from './msg_formatter';
import { BOT_MSG_PREFIX } from '../constants/misc';
import showHelp from './commands/show_help';
import showInfo from './commands/show_info';

export default class CaptainFactDiscordClient {
  constructor() {
    this.client = new Discord.Client();

    // Connection succeed
    this.client.on('ready', this.onReady);

    // Handle new members
    this.client.on('guildMemberAdd', this.onGuildMemberAdd);

    // Reply to some messages
    this.client.on('message', this.onMessage);
  }

  start() {
    return this.client.login(process.env.DISCORD_BOT_TOKEN);
  }

  onReady = () => {
    logInfo(`Logged in as ${this.client.user.tag}!`);
  };

  onGuildMemberAdd = (member) => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find(ch => ch.name === 'general');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    logInfo(`Welcoming new user ${member}`);
    if (IS_DEV_MODE) return;
    channel.send(render('welcome', { member }));
  };

  onMessage = (message) => {
    if (message.author.bot || !message.content.startsWith(BOT_MSG_PREFIX)) {
      return;
    }

    // Split command
    const command = message
      .toString()
      .substr(BOT_MSG_PREFIX.length)
      .match(/\S+/g) || [];

    switch (command[0]) {
      case undefined:
      case 'help':
        showHelp(message, command.splice(1));
        break;
      case 'info':
        showInfo(message, command.splice(1));
        break;
      default:
        logInfo(`Unknown command ${command} by ${message.author.tag}`);
    }
  };
}
