import Joi from 'joi';

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// Joi rules
const envVarSchema = Joi.object({
  NODE_ENV: Joi.string().default('development'), // default development
  PORT: Joi.number().default(8080), // default 8080
  MYSQL_PORT: Joi.number().default(3306), // default 3306
  MYSQL_HOST: Joi.string().default('127.0.0.1'), // default 127.0.0.1
  MYSQL_USER: Joi.string(),
  MYSQL_PASS: Joi.string(),
  MYSQL_DATABASE: Joi.string()
}).required();

// Joi validate
const envVars = envVarSchema.validate({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MYSQL_PORT: process.env.MYSQL_PORT,
  MYSQL_HOST: process.env.MYSQL_HOST,
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_PASS: process.env.MYSQL_PASS,
  MYSQL_DATABASE: process.env.MYSQL_DATABASE
});

if (envVars.error) {
  throw envVars.error;
}

const config = {
  env: envVars.value.NODE_ENV,
  port: envVars.value.PORT,
  mysqlPort: envVars.value.MYSQL_PORT, // 連接阜號
  mysqlHost: envVars.value.MYSQL_HOST, // 主機名稱
  mysqlUserName: envVars.value.MYSQL_USER, // 用戶名稱
  mysqlPass: envVars.value.MYSQL_PASS, // 資料庫密碼
  mysqlDatabase: envVars.value.MYSQL_DATABASE // 資料庫名稱
};

console.log(config);

export default config;
