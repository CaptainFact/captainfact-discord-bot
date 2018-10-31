import http from 'http';
import { logInfo, logError } from './lib/logger';

import CaptainFactDiscordClient from './lib/captain_fact_discord_client';

new CaptainFactDiscordClient().start().then(
  () => {
    // Start a web server to satisfy Zeit
    logInfo('Starting web server on port 3000');
    http.createServer().listen(3000);
  },
  () => {
    logError('Invalid Discord API token');
    process.exit(1);
  },
);
