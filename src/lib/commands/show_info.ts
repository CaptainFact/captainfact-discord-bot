import { Message } from "discord.js";
import { reply, richReply } from "../discord_utils";
import render from "../msg_formatter";
import MsgTemplate from "../msg_template";

export default function showInfo(message: Message, args: string[]) {
  if (args.length === 0) {
    reply(
      message,
      "Mauvaise utilisation de la commande. Utilisez `!CF help` pour la liste de commandes disponnibles.",
    );
  } else if (args[0] === "groups") {
    richReply(message, render(MsgTemplate.info_groups), "Les groupes");
  } else if (args[0] === "channels") {
    richReply(message, render(MsgTemplate.info_channels), "Les salons");
  } else if (args[0] === "opensource") {
    richReply(message, render(MsgTemplate.info_opensource), "Contribuer");
  } else {
    reply(message, `Menu d'info inconnu: ${args[0]}`);
  }
}
