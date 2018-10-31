export const IS_DEV_MODE = process.env.NODE_ENV !== "production";
export const BOT_MSG_PREFIX = IS_DEV_MODE ? "!CFD" : "!CF";
