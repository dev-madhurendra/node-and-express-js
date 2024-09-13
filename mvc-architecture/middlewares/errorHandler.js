// Error-handling middleware
const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    message: 'Something went wrong!',
    error: err.message,
  });
};

module.exports = errorHandler;
