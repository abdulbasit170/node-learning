import User from '../models/user'
import { generateAccessToken, generateRefreshToken } from '../utils/'

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
    const refreshToken = generateRefreshToken(username)

    // save in DB [OPTIONAL]

    return { accessToken, refreshToken }
  }

  refresh = async (username: string) => {
    await this.getUserByUsername(username)

    const accessToken = generateAccessToken(username)
    const refreshToken = generateRefreshToken(username)

    // save in DB [OPTIONAL]

    return { accessToken, refreshToken }
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
