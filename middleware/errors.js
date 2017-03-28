function errorHandler (err, req, res, next) {
  console.error(err);

  if (req.app.get('env') !== 'development') {
    delete err.stack;
  }

  res.status(err.statusCode || 500).json({ success: false, error: err });
}

function NotFound(message, errorCode) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message || 'The requested resource couldn\'t be found';
  this.statusCode = 404;
  this.errorCode = errorCode || 404;
}

function Forbidden(message, errorCode) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message || 'Forbidden';
  this.statusCode = 403;
  this.errorCode = errorCode || 403;
}

function Unauthorized(message, errorCode) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message || 'Unauthorized Request';
  this.statusCode = 401;
  this.errorCode = errorCode || 401;
}

function InternalServerError(message, errorCode) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message || 'Internal Server Error';
  this.statusCode = 500;
  this.errorCode = errorCode || 500;
}

function BadRequest(message, errorCode) {
  Error.captureStackTrace(this, this.constructor);
  this.name = 'BadRequest';
  this.message = message || 'Bad Request';
  this.statusCode = 400;
  this.errorCode = errorCode || 400;
}

module.exports = {
  errorHandler,
  errors: {
    NotFound,
    Forbidden,
    Unauthorized,
    InternalServerError,
    BadRequest,
  },
};
