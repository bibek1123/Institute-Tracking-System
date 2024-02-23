const validate = (validator) => {
  return async function (req, res, next) {
    try {
      if (req.body && Object.keys(req.body).length !== 0) {
        await validator.validateAsync(req.body);
      }
      if (req.params && Object.keys(req.params).length !== 0) {
        await validator.validateAsync(req.params);
      }
      next();
    } catch (err) {
      res.message = err.message;
      return util.validationErrorResponse(res);
    }
  };
};


module.exports = validate;
