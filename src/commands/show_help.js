import { IS_DEV_MODE } from '../constants';
import { logInfo } from '../logger';

export default function showHelp(message, _args) {
  logInfo(`Show help to ${message.author.tag}`);
  if (IS_DEV_MODE) return;
  message.author.send("Aucune commande n'a été configurée pour le moment. Vous pouvez faire des suggestions sur les commandes que vous aimeriez voir en postant un message dans le salon #propositions.");
}
