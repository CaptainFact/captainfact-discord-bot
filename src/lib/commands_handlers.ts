import { Message } from "discord.js";
import commandHelp from "./commands/help";
import commandInfo from "./commands/info";

type ICommandFunc = (message: Message, args: string[]) => void;

interface ICommandsHandlers {
  [s: string]: ICommandFunc;
}

const CommandsHandlers: ICommandsHandlers = {
  help: commandHelp,
  info: commandInfo,
};

export default CommandsHandlers;
