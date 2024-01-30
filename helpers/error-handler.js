const ErrorHandler = (err, req, res, next) => {
  console.log("masuk ErrorHandler");
  let errorCode = err.code ?? 500;
  let errorMessage = err.message ?? "Internal server error";

  switch (err.name) {
    case "JsonWebTokenError":
      errorCode = 401;
      errorMessage = "Unauthorized";
      break;
      S;
  }

  switch (errorCode) {
    case 400:
      break;
    case 401:
      break;

    case 404:
      errorMessage = "Not Found";
      break;
  }
  res.status(errorCode).json({
    success: false,
    status: errorCode,
    message: errorMessage,
  });
};

module.exports = ErrorHandler;
