import { createLogger, format, transports } from "winston";

const { combine, printf } = format;

// 🇹🇷 tarih format fonksiyonu
const formatDateTR = () => {
  return new Date().toLocaleString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const logFormat = printf(({ level, message }) => {
  return `${formatDateTR()} [${level}]: ${message}`;
});

export const logger = createLogger({
  level: "info",
  format: combine(logFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combined.log" }),
  ],
});