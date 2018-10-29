import http from 'http';
import Discord from 'discord.js';
import { logInfo, logError } from './logger';
import showHelp from './commands/show_help';
import { IS_DEV_MODE, BOT_MSG_PREFIX } from './constants';
import { PRESENTATION_CHANNEL_ID, HELP_CHANNEL_ID } from './channels';

// ---- Code start ----

const client = new Discord.Client();

/**
 * Connection succeed
 */
client.on('ready', () => {
  logInfo(`Logged in as ${client.user.tag}!`);
});

/**
 * Handle new members
 */
client.on('guildMemberAdd', (member) => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'general');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  logInfo(`Welcoming new user ${member}`);
  if (IS_DEV_MODE) return;
  channel.send(`Bienvenue ${member} ! N'hésitez pas à vous présenter sur <#${PRESENTATION_CHANNEL_ID}> ou à poster un message dans <#${HELP_CHANNEL_ID}> si vous rencontrez un problème.`);
});

/**
 * Reply to some messages
 */
client.on('message', (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(BOT_MSG_PREFIX)) return;
  const command = message.toString().substr(BOT_MSG_PREFIX.length).match(/\S+/g) || [];
  switch (command[0]) {
    case undefined:
    case 'help':
      showHelp(message, command.splice(1));
      break;
    default:
      logInfo(`Unknown command ${command} by ${message.author.tag}`);
  }
});

/**
 * Login
 */
client.login(process.env.DISCORD_BOT_TOKEN).then(() => {
  // Start a web server to satisfy Zeit
  logInfo('Starting web server on port 3000');
  http.createServer().listen(3000);
}, () => {
  logError('Invalid Discord API token');
  process.exit(1);
});
