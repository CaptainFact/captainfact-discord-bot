/* tslint:disable:no-console */

export const logInfo = (msg: string) => {
  console.info(`[🤖-BOT]> ${msg}`);
};

export const logError = (msg: string) => {
  console.error(`[🤖-BOT]> ${msg}`);
};

export const logDevMessage = (msg: string) => {
  console.log(
    `\n------ START OF MESSAGE ------\n${msg}\n------ END OF MESSAGE ------\n`,
  );
};
