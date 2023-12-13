import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./routes/user.routes.js"

dotenv.config()

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected successfukly")
  })
  .catch((error) => console.log(error, "error"))

const app = express()

app.use('/api/user', userRoutes)

app.listen(1000, () => {
  console.log("server is running")
})
