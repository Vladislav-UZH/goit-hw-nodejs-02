const { HttpError } = require("../helpers");

const validateBody = (schema, statusCode = 400, errorMessage) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    const isEmptyReqBody = Object.keys(req.body).length;

    if (!isEmptyReqBody) {
      next(HttpError(400, "missing fields"));
    }

    if (error) {
      console.log(error.details[0].message);
      next(
        HttpError(
          statusCode,
          errorMessage || `missing required /${error.details[0].path[0]}/ field`
        )
      );
    }
    console.log();

    next();
  };
  return func;
};

module.exports = validateBody;
