import winston, {Logger} from "winston";

export const logger: Logger = winston.createLogger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
});

export const loggerJSON: Logger = winston.createLogger({
  transports: [new winston.transports.Console()]
  ,format: winston.format.combine(winston.format.colorize(),winston.format.json())})
