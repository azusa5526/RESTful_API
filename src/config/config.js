import Joi from 'joi';

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// 建立每個變數 joi 驗證規則

const envVarSchema = Joi.object({
  NODE_ENV: Joi.string().default('development'), // 字串且預設值為development 並只允許兩種參數
  PORT: Joi.number().default(8080) // 數字且預設值為 8080
}).required();

// process.env 撈取 .env 內的變數做 joi 驗證
// const { error, value: envVars } = Joi.validate(process.env, envVarSchema);

// if (error) {
//   throw new Error(`Config validation error: ${error.message}`);
// }

const envVars = envVarSchema.validate({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT
});

if (envVars.error) {
  throw envVars.error;
}

console.log('envVars', envVars);

const config = {
  env: envVars.value.NODE_ENV,
  port: envVars.value.PORT
};

export default config; // 匯出共用
