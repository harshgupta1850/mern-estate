import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser"

dotenv.config()

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected successfukly")
  })
  .catch((error) => console.log(error, "error"))

const app = express()

app.use(express.json())
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use(cookieParser())

app.listen(3000, () => {
  console.log("server is running")
})

app.use((error, req, res, next) => {
  console.log(error)
  const statusCode = error.statusCode || 500
  const message = error.message || "Internal server error"
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
})