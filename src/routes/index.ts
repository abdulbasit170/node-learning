import express from 'express'
import todosRouter from './todos'

const app = express.Router()

app.get('/', function (req: any, res: any) {
  res.send('Hello World')
})

app.use('/todos', todosRouter)

export default app
