import ulog from "ulog";
import { isDevelopment } from "./util";
type LoggerModule = "network" | "electron" | "boot";

ulog.level = isDevelopment() ? ulog.TRACE : ulog.WARN;

const loggers: { [key: string]: Logger } = {};

export function logger(module: LoggerModule): Logger {
  let logger = loggers[module];
  if (!logger) {
    logger = ulog(module);
    loggers[module] = logger;
  }
  return logger;
}

type LogFunction = (...args: unknown[]) => void;

interface Logger {
  error: LogFunction;
  warn: LogFunction;
  info: LogFunction;
  debug: LogFunction;
}
