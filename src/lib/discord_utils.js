import { RichEmbed } from 'discord.js';
import { logDevMessage } from './logger';
import { IS_DEV_MODE } from '../constants';

export const reply = (message, body) => {
  if (IS_DEV_MODE) {
    logDevMessage(JSON.stringify(body, null, 2));
  } else {
    message.reply(body);
  }
};

export const richReply = (message, body, title) => {
  const embed = new RichEmbed()
    .setTitle(`:information_source: **${title}**\n===========================\n`)
    .setColor('#0097F4')
    .setDescription(body);

  reply(message, embed);
};
