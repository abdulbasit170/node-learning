import express from 'express'
import mongoose from 'mongoose'
import { Todo } from './models/todo'

const app = express()

app.use(express.json())

app.get('/', function (req: any, res: any) {
  res.send('Hello World')
})

mongoose.connect(
  'mongodb+srv://admin:admin@cluster0.utlbl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  (err: any) => {
    if (err) throw err

    console.log('Connected to db!')
  }
)

app.get('/todos', async function (req: any, res: any) {
  const todos = await Todo.find({})

  res.send(todos)
})

app.get('/todos/:id', async function (req: any, res: any) {
  const { id } = req.params // object destructuring

  if (!id) return res.status(400).send('Id not present')

  const foundTodo = await Todo.findOne({ _id: id })

  if (!foundTodo) return res.status(400).send(`No Todo found against id: ${id}`)

  return res.send(foundTodo)
})

app.post('/todos', async function (req: any, res: any) {
  const value = req.body?.value

  if (!value) return res.status(400).send('value is not present')

  const newTodo = new Todo({ value })
  await newTodo.save()

  res.send(newTodo)
})

app.patch('/todos/:id', async function (req: any, res: any) {
  const { id } = req.params // object destructuring

  if (!id) return res.status(400).send('Id not present')

  const foundTodo = await Todo.findOne({ _id: id })
  if (!foundTodo) return res.status(400).send(`No Todo found against id: ${id}`)

  const value = req.body?.value

  if (!value) return res.status(400).send('value is not present')

  const updatedTodo = await Todo.findByIdAndUpdate(id, { value }, { new: true })

  res.send(updatedTodo)
})

app.delete('/todos/:id', async function (req: any, res: any) {
  const { id } = req.params // object destructuring

  if (!id) return res.status(400).send('Id not present')

  const foundTodo = await Todo.findOne({ _id: id })
  if (!foundTodo) return res.status(400).send(`No Todo found against id: ${id}`)

  await foundTodo.remove()

  res.send('task is deleted')
})

app.listen(3000)
