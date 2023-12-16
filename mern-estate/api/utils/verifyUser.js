import jwt from "jsonwebtoken"
import errorHandler from "./error.js"

export const verifyUser = async (req, res, next) => {
  const token = req.header('cookie').split("=")[1]
  if (!token) return next(errorHandler(405, "unauthorized"))
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, "unauthorized"))
    }
    req.user = user
    next()
  })
}