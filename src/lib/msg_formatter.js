import fs from 'fs';
import compile from 'string-template/compile';
import { logError } from './logger';
import {
  CHANNEL_ID_HELP,
  CHANNEL_ID_PRESENTATION,
  CHANNEL_ID_PROPOSITIONS,
  CHANNEL_ID_VIDEOS_SUGGESTIONS,
  CHANNEL_ID_LIVE,
} from '../constants/channels';

import {
  ROLE_ID_TEAM,
  ROLE_ID_AMBASSADORS,
  ROLE_ID_AMBASSADORS_PADAWAN,
  ROLE_ID_CONTRIBUTOR,
  ROLE_ID_ENLARGED_CIRCLE,
} from '../constants/roles';

const compileTemplate = subPath => compile(fs.readFileSync(`src/messages/${subPath}`, { encoding: 'UTF8' }));

const TEMPLATES = {
  welcome: compileTemplate('welcome.md'),
  help: compileTemplate('help.md'),
  'info.channels': compileTemplate('info/channels.md'),
  'info.groups': compileTemplate('info/groups.md'),
  'info.opensource': compileTemplate('info/opensource.md'),
};

const AVAILABLE_TEMPLATES = Object.keys(TEMPLATES);

const GLOBALS = {
  // Channels
  ChannelHelp: `<#${CHANNEL_ID_HELP}>`,
  ChannelPresentation: `<#${CHANNEL_ID_PRESENTATION}>`,
  ChannelVideosSuggestions: `<#${CHANNEL_ID_VIDEOS_SUGGESTIONS}>`,
  ChannelPropositions: `<#${CHANNEL_ID_PROPOSITIONS}>`,
  ChannelLive: `<#${CHANNEL_ID_LIVE}>`,
  // Roles
  RoleTeam: `<@&${ROLE_ID_TEAM}>`,
  RoleAmbassador: `<@&${ROLE_ID_AMBASSADORS}>`,
  RoleAmbassadorPadawan: `<@&${ROLE_ID_AMBASSADORS_PADAWAN}>`,
  RoleContributor: `<@&${ROLE_ID_CONTRIBUTOR}>`,
  RoleEnlargedCircle: `<@&${ROLE_ID_ENLARGED_CIRCLE}>`,
};

/**
 * Format a template with given vars.
 * @param {string} template - template name. See `AVAILABLE_TEMPLATES`
 * @param {object} vars - an object of values to replace
 */
export default function render(template, vars = {}) {
  if (!AVAILABLE_TEMPLATES.includes(template)) {
    logError(`Unknwown template name: ${template}`);
    return 'An error occured';
  }
  return TEMPLATES[template](Object.assign(GLOBALS, vars));
}
