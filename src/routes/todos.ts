import express from 'express'
import { TodosController } from '../controllers/todos'
import Todo from '../models/todo'

const todosRouter = express.Router()

const controller = new TodosController()

todosRouter.get('/', async function (req: any, res: any) {
  const todos = await Todo.find({})

  res.send(todos)
})

todosRouter.get('/:id', async function (req: any, res: any) {
  const { id } = req.params // object destructuring

  if (!id) return res.status(400).send('Id not present')

  const foundTodo = await Todo.findOne({ _id: id })

  if (!foundTodo) return res.status(400).send(`No Todo found against id: ${id}`)

  return res.send(foundTodo)
})

todosRouter.post('/', async function (req: any, res: any) {
  const value = req.body?.value

  if (!value) return res.status(400).send('value is not present')

  const newTodo = controller.createTodo(req.body)

  res.send(newTodo)
})

todosRouter.patch('/:id', async function (req: any, res: any) {
  const { id } = req.params // object destructuring

  if (!id) return res.status(400).send('Id not present')

  const foundTodo = await Todo.findOne({ _id: id })
  if (!foundTodo) return res.status(400).send(`No Todo found against id: ${id}`)

  const value = req.body?.value

  if (!value) return res.status(400).send('value is not present')

  const updatedTodo = await Todo.findByIdAndUpdate(id, { value }, { new: true })

  res.send(updatedTodo)
})

todosRouter.delete('/:id', async function (req: any, res: any) {
  const { id } = req.params // object destructuring

  if (!id) return res.status(400).send('Id not present')

  const foundTodo = await Todo.findOne({ _id: id })
  if (!foundTodo) return res.status(400).send(`No Todo found against id: ${id}`)

  await foundTodo.remove()

  res.send('task is deleted')
})

export default todosRouter
