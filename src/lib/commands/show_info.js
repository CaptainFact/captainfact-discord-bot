import { RichEmbed } from 'discord.js';
import { IS_DEV_MODE } from '../../constants';
import { logDevMessage } from '../logger';
import render from '../msg_formatter';

const reply = (message, response) => {
  if (IS_DEV_MODE) {
    logDevMessage(message);
  } else {
    message.reply(response);
  }
};

const richReply = (message, response, title) => {
  const embed = new RichEmbed()
    .setTitle(`:information_source: **${title}**\n===========================\n`)
    .setColor('#0097F4')
    .setDescription(response);

  reply(message, embed);
};

export default function showInfo(message, args) {
  if (!args || !args[0]) {
    reply(
      message,
      'Mauvaise utilisation de la commande. Utilisez `!CF help` pour la liste de commandes disponnibles.',
    );
  } else if (args[0] === 'groups') {
    richReply(message, render('info.groups'), 'Les groupes');
  } else if (args[0] === 'channels') {
    richReply(message, render('info.channels'), 'Les salons');
  } else if (args[0] === 'opensource') {
    richReply(message, render('info.opensource'), 'Contribuer');
  } else {
    reply(message, `Menu d'info inconnu: ${args[0]}`);
  }
}
