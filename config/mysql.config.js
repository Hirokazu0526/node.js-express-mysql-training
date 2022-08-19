module.exports = {
  HOST: process.env.MYSQL_HOST || "127.0.0.1",
  PORT: process.env.MYSQL_PORT || "3306",
  USERNAME: process.env.MYSQL_USERNAME || "root",
  PASSWORD: process.env.MYSQL_PASSWORD || "hirokazu0526",
  DATABASE: process.env.MYSQL_DATABASE || "tastylog",
  CONNECTION_LIMIT: process.env.MYSQL_CONNECTIONLIMIT ? parseInt(process.env.MYSQL_CONNECTIONLIMIT) : 10,
  QUEUE_LIMIT: process.env.MYSQL_QUEUELIMIT ?  parseInt(process.env.MYSQL_QUEUELIMIT) : 0 
};