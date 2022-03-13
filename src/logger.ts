import { createLogger, format, transports } from 'winston';

const { timestamp, combine, uncolorize, json, colorize, printf } = format;

/** winston levels are as follows: error warn info http verbose debug silly
 *  log errors to './logs/error.log'
 *  log everything with a level of error/warn/info/http to './logs/combined.log'
 *  log everything with a level of error/warn/info/http/verbose/debug to the console
 */

const debugOnly = format(info => (info.level === 'debug' ? info : false));

const options = {
  file: {
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 2,
    format: combine(
      uncolorize(),
      timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
      json(),
      printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`)
    ),
  },
  console: {
    level: 'http', // error warn info http
    format: combine(
      colorize(),
      timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
      printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`)
    ),
  },
};

export const logger = createLogger({
  transports: [
    new transports.Console(options.console),
    new transports.File({
      ...options.file,
      level: 'http', // error warn info http
      filename: './logs/combined.log',
    }),
    new transports.File({
      ...options.file,
      level: 'error', // error only
      filename: './logs/error.log',
    }),
    new transports.File({
      ...options.file,
      options: { flags: 'w' }, // rewrite file on each program run
      level: 'debug', // error warn info http verbose debug
      filename: './logs/debug.log',
      format: combine(
        debugOnly(), // filter out all but debug
        uncolorize(),
        timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
        json(),
        printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`)
      ),
    }),
  ],
});
