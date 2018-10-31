import { Message, TextChannel } from "discord.js";
import { reply } from "../discord_utils";
import ChannelID from "../enums/channel_id";
import RoleID from "../enums/role_id";
import { logError, logInfo } from "../logger";

export default function commandPromote(message: Message, args: string[]) {
  // Ensure permissions
  if (!message.member.roles.has(RoleID.Team)) {
    reply(message, "Vous n'avez pas la permission de faire ça", true);
    return;
  }

  // Ensure sent on server
  if (!message.guild) {
    reply(message, "Vous ne pouvez pas envoyer cette commande en MP.", true);
    return;
  }

  // Get user and role, ensure valid params format
  // Ensure correct number of params
  const role = message.mentions.roles.first();
  const members = message.mentions.members;
  if (!role || members.size === 0) {
    reply(
      message,
      "Utilisation: !CF promote [@role] [@user1] [@user2]...",
      true,
    );
    return;
  }

  // Promote all users
  const generalChannel = message.guild.channels.get(ChannelID.General);
  message.mentions.members.map((member) => {
    // Promote user
    logInfo(`Assign ${role} to ${member}`);
    member.addRole(role).then(() => {
      // Post message on general
      (generalChannel as TextChannel).send(
        `Bravo à ${member} qui rejoint le groupe ${role} !`,
      );
    }, logError);
  });

  // Delete command
  message.delete();
}
