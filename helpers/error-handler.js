const ErrorHandler = (err, req, res, next) => {
  console.log('masuk ErrorHandler');
  let errorCode = err.code ?? 500;
  let errorMessage = err.message ?? 'Internal server error';

  switch (err.name) {
    case 'JsonWebTokenError':
      errorCode = 401;
      errorMessage = 'Unauthorized';
      break;
    case 'ValidationError':
      errorCode = 400;
      errorMessage = err.errors.map(e => e.message);
      break;
  }

  switch (errorCode) {
    case 400:
      break;
    case 401:
      break;
    case 403:
      errorMessage = 'Forbidden';
      break;
    case 404:
      errorMessage = 'Not Found';
      break;
    default:
      break;
  }
  res.status(errorCode).json({
    success: false,
    status: errorCode,
    message: errorMessage,
  });
}

module.exports = ErrorHandler;
