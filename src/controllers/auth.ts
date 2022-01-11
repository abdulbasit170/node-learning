import User from '../models/user'
import { generateAccessToken } from '../utils/generateAccessToken'

interface loginPayload {
  username: string
  password: string
}

export class AuthController {
  login = async ({ username, password }: loginPayload) => {
    const user = await this.getUserByUsername(username)

    if (user.password !== password)
      throw {
        code: 401,
        message: 'Invalid password'
      }

    const accessToken = generateAccessToken(username)

    return { accessToken }
  }

  private getUserByUsername = async (username: string) => {
    const foundUser = await User.findOne({ username })

    if (!foundUser)
      throw {
        code: 400,
        message: `No User found against username: ${username}`
      }

    return foundUser
  }
}
