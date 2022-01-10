import express from 'express'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import routes from './routes'

dotenv.config()

const app = express()

app.use(express.json())

app.use('/', routes)

mongoose.connect(process.env.DB_URL as string, (err: any) => {
  if (err) throw err

  console.log('Connected to db!')
})

function generateAccessToken(username: string) {
  return jwt.sign(
    {
      username,
    },
    process.env.TOKEN_SECRET as string,
    {
      expiresIn: '864000000s',
    }
  )
}

app.post('/api/createNewUser', (req, res) => {
  const username: string = req.body.username

  const token = generateAccessToken(username)
  res.json(token)
})

app.listen(3000)
