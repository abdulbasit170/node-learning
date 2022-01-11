import express from 'express'
import { authenticateToken } from '../middlewares/authenticateToken'

import todosRouter from './todos'
import usersRouter from './users'
import authRouter from './auth'

const app = express.Router()

app.get('/', function (req: any, res: any) {
  res.send('Hello World')
})

app.use('/todos', authenticateToken, todosRouter)
app.use('/users', authenticateToken, usersRouter)
app.use('/auth', authRouter)

export default app
