import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import config from './config';
import index from '../server/routes/index.route';
import expressValidation from 'express-validation';
import APPError from '../server/helper/AppError';
import httpStatus from 'http-status';

const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// enable CORS - Cross Origin Resource Sharing
app.use(cors());
// HTTP request logger middleware for node.js
app.use(morgan('dev'));

/* GET home page. */
app.get('/', (req, res) => {
  res.send(`server started on  port http://127.0.0.1:${config.port} (${config.env})`);
});

app.use('/api', index);

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  let errorMessage, errorCode, errorStatus;
  // express validation error 所有傳入參數驗證錯誤
  if (err instanceof expressValidation.ValidationError) {
    if (err.errors[0].location === 'query' || err.errors[0].location === 'body') {
      errorMessage = err.errors[0].message;
      errorStatus = httpStatus.BAD_REQUEST;
      isPublic = true;
      errorCode = 400;
    }
    const error = new APPError.APIError(errorMessage, errorStatus, isPublic, errorCode);
    return next(error);
  }
  return next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    code: err.code ? err.code : httpStatus[err.status],
    stack: config.env === 'development' ? err.stack : {}
  });
  next();
});

export default app;
