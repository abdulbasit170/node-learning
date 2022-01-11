import jwt from 'jsonwebtoken'

export const generateAccessToken = (username: string): string =>
  jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: '60s'
  })
