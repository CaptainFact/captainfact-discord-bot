import render from '../msg_formatter';
import { reply, richReply } from '../discord_utils';

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
