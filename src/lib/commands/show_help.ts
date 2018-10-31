import { Message } from "discord.js";
import { richReply } from "../discord_utils";
import render from "../msg_formatter";
import MsgTemplate from "../msg_template";

export default function showHelp(message: Message) {
  richReply(message, render(MsgTemplate.help), "Utilisation du bot Discord");
}
