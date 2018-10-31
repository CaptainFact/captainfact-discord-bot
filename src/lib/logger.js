export const logInfo = (msg) => {
  console.info(`[🤖-BOT]> ${msg}`);
};

export const logError = (msg) => {
  console.error(`[🤖-BOT]> ${msg}`);
};

export const logDevMessage = (msg) => {
  console.log(`\n------ START OF MESSAGE ------\n${msg}\n------ END OF MESSAGE ------\n`);
};
