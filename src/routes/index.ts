import express from 'express'
import jwt from 'jsonwebtoken';


import todosRouter from './todos'



const app = express.Router()

const TOKEN_SECRET: string = 'samplesecretkey';

//
app.get('/', function (req: any, res: any) {
  res.send('Hello World')
})


function authenticateToken(req: any, res: any, next: any) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, TOKEN_SECRET, (err: any, user: any) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}


app.use('/todos', authenticateToken, todosRouter)

export default app
