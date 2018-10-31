import { Message } from "discord.js";
import { BOT_MSG_PREFIX } from "../../constants";
import { reply } from "../discord_utils";
import RoleID from "../enums/role_id";
import render from "../msg_formatter";
import MsgTemplate from "../msg_template";

export default function commandSendAsBot(message: Message, args: string[]) {
  if (!message.member.roles.has(RoleID.Team)) {
    reply(message, "Vous n'avez pas la permission de faire ça", true);
    return;
  }

  const msgBody = message
    .toString()
    .replace(`${BOT_MSG_PREFIX} sendAsBot `, "");

  reply(message, msgBody);
  message.delete();
}
