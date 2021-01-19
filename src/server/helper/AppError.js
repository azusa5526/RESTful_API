import httpStatus from 'http-status';

class ExtendableError extends Error {
  constructor(message, status, isPublic, code) {
    super(message);
    this.message = message;
    this.name = this.constructor.name;
    this.status = status;
    this.isPublic = isPublic;
    this.code = code;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor.name);
  }
}

class LoginError1 extends ExtendableError {
  constructor(
    message = '信箱尚未註冊！',
    status = httpStatus.UNAUTHORIZED,
    isPublic = true,
    code = 401
  ) {
    super(message, status, isPublic, code);
    this.name = 'LoginError';
  }
}

class LoginError2 extends ExtendableError {
  constructor(
    message = '您輸入的帳戶或密碼有誤！',
    status = httpStatus.UNAUTHORIZED,
    isPublic = true,
    code = 401
  ) {
    super(message, status, isPublic, code);
    this.name = 'LoginError';
  }
}

class APIError extends ExtendableError {
  constructor(message, status = httpStatus.INTERNAL_SERVER_ERROR, isPublic = false, code) {
    super(message, status, isPublic, code);
    this.name = 'APIError';
  }
}

export default {
  LoginError1,
  LoginError2,
  APIError
};
