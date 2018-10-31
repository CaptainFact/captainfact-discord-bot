import { Message } from "discord.js";
import commandHelp from "./commands/help";
import commandInfo from "./commands/info";
import commandPromote from "./commands/promote";
import commandSendAsBot from "./commands/send_as_bot";

type ICommandFunc = (message: Message, args: string[]) => void;

interface ICommandsHandlers {
  [s: string]: ICommandFunc;
}

const CommandsHandlers: ICommandsHandlers = {
  help: commandHelp,
  info: commandInfo,
  promote: commandPromote,
  sendAsBot: commandSendAsBot,
};

export default CommandsHandlers;
