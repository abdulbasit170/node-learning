import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import http from 'http'
import { Server } from 'socket.io'
import routes from './routes'

dotenv.config()

const app = express()

app.use(express.json())

app.use('/', routes)

mongoose.connect(process.env.DB_URL as string, (err: any) => {
  if (err) throw err

  console.log('Connected to db!')
})

// creating http server 
const server = http.createServer(app);

const rooms = [
  'Room-1',
  'Room-2',
  'Room-3'
]

const io = new Server(server);
io.on('connection', (socket) => {
  console.log('a user connected');
  console.log(socket.handshake.query.room);

  socket.join(socket.handshake.query.room);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('message', (msg) => {
    console.log('message: ' + msg);
    socket.emit('reply', msg);
    // socket.broadcast.emit(msg);

  });

  // broadcasting
  // 
});



server.listen(3000)
