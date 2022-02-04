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

const server = http.createServer(app)

const rooms = ['Room-1', 'Room-2', 'Room-3']

const io = new Server(server)

io.on('connection', async (socket) => {
  const { room, name } = socket.handshake.query

  if (room && rooms.includes(room as string)) {
    socket.join(room)

    io.to(room).emit('message', {
      username: 'System',
      msg: `A new user has joined this room! : ${name}`
    })

    const sockets = await io.in(room).fetchSockets()
    const memberNames = sockets.map((socket) => socket.handshake.query.name)
    io.to(room).emit('members', memberNames)

    socket.on('message', (msg) => {
      io.to(room).emit('message', { username: name, msg })
    })

    socket.on('disconnect', async () => {
      io.to(room).emit('message', {
        username: 'System',
        msg: `A user has left this room! : ${name}`
      })

      const sockets = await io.in(room).fetchSockets()
      const memberNames = sockets.map((socket) => socket.handshake.query.name)
      io.to(room).emit('members', memberNames)
    })
  } else {
    socket.disconnect()
  }
})

server.listen(3000)
