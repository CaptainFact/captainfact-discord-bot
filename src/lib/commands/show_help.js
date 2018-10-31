import { IS_DEV_MODE } from '../../constants';
import { logDevMessage } from '../logger';
import render from '../msg_formatter';

export default function showHelp(message, args) {
  const sendReply = IS_DEV_MODE ? logDevMessage : msg => message.reply(msg);
  sendReply(render('help'));
}
