const winston = require('winston');
const publicIp = require('public-ip');
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

  logger.info(`Ip: ${ip}, sort: ${sortType}`);
}

module.exports = addLog