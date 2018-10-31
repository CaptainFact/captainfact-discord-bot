import { formatChannel, formatRole } from "./discord_utils";
import ChannelID from "./enums/channel_id";
import RolesID from "./enums/role_id";

interface IMessageFormatterGlobals {
  [s: string]: string;
}

const MessageFormatterGlobals: IMessageFormatterGlobals = {
  // Channels
  ChannelHelp: formatChannel(ChannelID.Help),
  ChannelLive: formatChannel(ChannelID.Live),
  ChannelPresentation: formatChannel(ChannelID.Presentation),
  ChannelPropositions: formatChannel(ChannelID.Propositions),
  ChannelVideosSuggestions: formatChannel(ChannelID.VideosSuggestions),
  // Roles
  RoleAmbassador: formatRole(RolesID.Ambassador),
  RoleAmbassadorPadawan: formatRole(RolesID.AmbassadorPadawan),
  RoleContributor: formatRole(RolesID.Contributor),
  RoleEnlargedCircle: formatRole(RolesID.EnlargedCircle),
  RoleTeam: formatRole(RolesID.Team),
};

export default MessageFormatterGlobals;
