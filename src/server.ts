import express from 'express'
import mongoose from 'mongoose'
import routes from './routes'

const app = express()

app.use(express.json())

app.use('/', routes)

mongoose.connect(
  'mongodb+srv://admin:admin@cluster0.utlbl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  (err: any) => {
    if (err) throw err

    console.log('Connected to db!')
  }
)

app.listen(3000)
