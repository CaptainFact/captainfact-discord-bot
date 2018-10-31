import render from '../msg_formatter';
import { richReply } from '../discord_utils';

export default function showHelp(message) {
  richReply(message, render('help'), 'Utilisation du bot Discord');
}
