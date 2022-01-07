import express from 'express';
import { authenticateToken } from '../middleware/authenticateToken';

import todosRouter from './todos';
import usersRouter from './users';

const app = express.Router()

const TOKEN_SECRET: string = 'samplesecretkey';

app.get('/', function (req: any, res: any) {
  res.send('Hello World')
})

app.use('/todos', authenticateToken, todosRouter)
app.use('/users', usersRouter)

export default app
