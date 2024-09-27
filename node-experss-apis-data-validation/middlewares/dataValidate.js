const { validationResult } = require("express-validator");
const logger = require("../config/logger");

const validateData = (req, res, next) => {
  const errors = validationResult(req);
  logger.info(">> Validation Errors " + errors)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateData
}
