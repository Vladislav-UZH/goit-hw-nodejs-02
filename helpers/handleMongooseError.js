const handleMongooseError = (err, data, next) => {
  const { name, code } = err;
  console.log(err);
  const status = name === "MongooseServerError" && code === 11000 ? 409 : 400;
  err.status = status;
  next(err);
};
module.exports = handleMongooseError;
