const winston = require('winston');
const publicIp = require('public-ip');
const moment = require('moment');
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './public/assets/log.txt' })
    ]
});

const addLog = async sortType => {
  await winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: './public/assets/log.txt' })
    ]
  });

  const ip = await publicIp.v4();
  const now = moment().format("YYYY-MM-DD HH:mm:ss")

  logger.info(`Ip: ${ip}, sort: ${sortType}, dateTime: ${now}`);
}

module.exports = addLog