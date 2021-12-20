const ErrorResponse = require("../classes/error-response");
const { Client } = require("pg");
const sha256 = require("js-sha256");

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const notFound = (req, _res, next) => {
  next(new ErrorResponse(`Not found - ${req.originalUrl}`, 404));
};

const errorHandler = (err, _req, res, _next) => {
  console.log("Ошибка", {
    message: err.message,
    stack: err.stack,
  });
  res.status(err.code || 500).json({
    message: err.message,
  });
};

const connectionHandler = async (req, res, next) => {
  let password = sha256(req.headers.password)
  const client = new Client({
    port: 5432,
    host: "localhost",
    database: "myCourseDb",
    user: req.headers.login,
    password: password,
  });
  req.client = client;
  next();
};

module.exports = {
  asyncHandler,
  notFound,
  errorHandler,
  connectionHandler,
};
