import User from "../models/user.model.js"
import errorHandler from "../utils/error.js"
import bcryptjs from "bcryptjs"

export const test = (req, res) => {
  res.json({
    message: 'helloo world'
  })
}

export const updateUser = async (req, res, next) => {
  const { username, password, email, avatar } = req.body
  if (req.user.id !== req.params.id) return next(errorHandler(401, "you can update your account only"))
  try {
    if (password) {
      const hashedPassword = bcryptjs.hashSync(password, 10)
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: {
          username,
          password: hashedPassword,
          email,
          avatar
        }
      }, { new: true })
      const { password, ...rest } = updatedUser._doc
      res.status(200).json(rest)
    }
  } catch (error) {
    next(error)
  }
}
