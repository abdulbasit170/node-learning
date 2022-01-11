import jwt from 'jsonwebtoken'

export function authenticateAccessToken(req: any, res: any, next: any) {
  authenticateToken(req, res, next, process.env.ACCESS_TOKEN_SECRET as string)
}

export function authenticateRefreshToken(req: any, res: any, next: any) {
  authenticateToken(req, res, next, process.env.REFRESH_TOKEN_SECRET as string)
}

const authenticateToken = (req: any, res: any, next: any, secret: string) => {
  const authHeader = req.headers['authorization']
  const token = authHeader?.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, secret, (err: any, user: any) => {
    if (err) return res.sendStatus(403)

    // check accessToken in user table and respond accordingly [OPTIONAL]

    req.user = user

    next()
  })
}
