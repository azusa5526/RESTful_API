import Joi from 'joi';

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// 建立每個變數 joi 驗證規則

const envVarSchema = Joi.object({
  NODE_ENV: Joi.string().default('development'), // 字串且預設值為development 並只允許兩種參數
  PORT: Joi.number().default(8080), // 數字且預設值為 8080
  MYSQL_PORT: Joi.number().default(3306), // 數字且預設值為3306
  MYSQL_HOST: Joi.string().default('127.0.0.1'), // 字串取預設值為127.0.0.1
  MYSQL_USER: Joi.string(), // 字串
  MYSQL_PASS: Joi.string(), // 字串
  MYSQL_DATABASE: Joi.string()
}).required();

// process.env 撈取 .env 內的變數做 joi 驗證
// const { error, value: envVars } = Joi.validate(process.env, envVarSchema);

// if (error) {
//   throw new Error(`Config validation error: ${error.message}`);
// }

const envVars = envVarSchema.validate({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MYSQL_PORT: process.env.MYSQL_PORT, // 數字且預設值為3306
  MYSQL_HOST: process.env.MYSQL_HOST, // 字串取預設值為127.0.0.1
  MYSQL_USER: process.env.MYSQL_USER, // 字串
  MYSQL_PASS: process.env.MYSQL_PASS, // 字串
  MYSQL_DATABASE: process.env.MYSQL_DATABASE
});

if (envVars.error) {
  throw envVars.error;
}

const config = {
  env: envVars.value.NODE_ENV,
  port: envVars.value.PORT,
  mysqlPort: envVars.value.MYSQL_PORT, // 連接阜號(MYSQL_PORT)
  mysqlHost: envVars.value.MYSQL_HOST, // 主機名稱 (MYSQL_HOST)
  mysqlUserName: envVars.value.MYSQL_USER, // 用戶名稱 (MYSQL_USER)
  mysqlPass: envVars.value.MYSQL_PASS, // 資料庫密碼(MYSQL_PASS)
  mysqlDatabase: envVars.value.MYSQL_DATABASE // 資料庫名稱(MYSQL_DATABASE)
};

console.log(config);

export default config; // 匯出共用
