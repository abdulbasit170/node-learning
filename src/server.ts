import express from 'express'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken';

import routes from './routes'

const TOKEN_SECRET: string = 'samplesecretkey';

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

function generateAccessToken(username: string) {
  return jwt.sign({
    username
  }, TOKEN_SECRET, {
    expiresIn: '864000000s'
  });
}

app.post('/api/createNewUser', (req, res) => {

  const username: string = req.body.username;

  const token = generateAccessToken(username);
  res.json(token);

});

app.listen(3000)