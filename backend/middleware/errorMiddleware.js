// 1. Handle "Not Found" URLs (e.g., user types /api/nonsense)
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// 2. Handle General Errors (Crashes, database failures)
const errorHandler = (err, req, res, next) => {
  // If status is 200 (OK) but there is an error, change it to 500 (Server Error)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode);
  res.json({
    message: err.message,
    // Only show detailed stack trace if we are in development mode, not production
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };