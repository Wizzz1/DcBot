import { Events } from "discord.js";
import logger from "../utils/logger.js";

export const event = {
  name: Events.ClientReady,
  once: false, //如果想once: True; Not once: false
};

export const action = (c) => {
  logger.info(`Ready! Logged in as ${c.user.tag}`);
};
