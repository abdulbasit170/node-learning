import jwt from 'jsonwebtoken'

export const generateRefreshToken = (username: string): string =>
  jwt.sign({ username }, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: '864000000s'
  })
