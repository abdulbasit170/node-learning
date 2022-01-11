import User, { UserPayload } from '../models/user'

export class UsersController {
  getUsers = async () => User.find({})

  getUser = async (id: number) => {
    const foundUser = await User.findOne({ _id: id })

    if (!foundUser)
      throw {
        code: 400,
        message: `No User found against id: ${id}`
      }

    return foundUser
  }

  createUser = async (data: UserPayload) => {
    const { username, name } = data

    const alreadyExist = await User.findOne({ username })
    if (alreadyExist)
      throw {
        code: 403,
        message: `User already exists with username: ${username}`
      }

    const newUser = new User({ username, name })

    await newUser.save()

    return newUser
  }

  updateUser = async (id: number, data: UserPayload) => {
    const foundUser = await User.findOne({ _id: id })

    if (!foundUser)
      throw {
        code: 403,
        message: `No User found against id: ${id}`
      }

    const { username, name } = data

    const updatedTodo = await User.findByIdAndUpdate(
      id,
      { username, name },
      { new: true }
    )

    return updatedTodo
  }

  deleteUser = async (id: number) => {
    const foundUser = await User.findOne({ _id: id })

    if (!foundUser)
      throw {
        code: 403,
        message: `No User found against id: ${id}`
      }

    await foundUser.remove()

    return 'task is deleted'
  }
}
