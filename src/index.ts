import http from "http";
import { logError, logInfo } from "./lib/logger";

import CaptainFactDiscordClient from "./lib/captain_fact_discord_client";

new CaptainFactDiscordClient().start().then(
  () => {
    // Start a web server to satisfy Zeit
    logInfo(`Starting web server on port ${process.env.PORT}`);
    http.createServer().listen(process.env.PORT);
  },
  () => {
    logError("Invalid Discord API token");
    process.exit(1);
  }
);
