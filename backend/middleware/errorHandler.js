export const errorHandler = (err, req, res, next) => {
  console.error(err.stack)

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode

  res.status(err.statusCode || 500).json({
    message: err.message || "An unexpected error occurred",
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  })
}
