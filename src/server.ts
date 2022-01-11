import express from 'express'
import mongoose from 'mongoose'
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

app.listen(3000)
