import express from 'express'
import { TodosController } from '../controllers/todos'
import Todo from '../models/todo'
import { todoValidation } from '../utils/validations'

const todosRouter = express.Router()

const controller = new TodosController()

todosRouter.get('/', async function (req: any, res: any) {
  try {
    const todos = await Todo.find({})

    res.send(todos)
  } catch (err: any) {
    const statusCode = err.code ?? 500

    delete err.code

    res.status(statusCode).send(err)
  }
})

todosRouter.get('/:id', async function (req: any, res: any) {
  const { id } = req.params

  try {
    const foundTodo = controller.getTodo(id)

    return res.send(foundTodo)
  } catch (err: any) {
    const statusCode = err.code ?? 500

    delete err.code

    res.status(statusCode).send(err)
  }
})

todosRouter.post('/', async function (req: any, res: any) {
  const { error, value: body } = todoValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  try {
    const newTodo = controller.createTodo(req.body)

    res.send(newTodo)
  } catch (err: any) {
    const statusCode = err.code ?? 500

    delete err.code

    res.status(statusCode).send(err)
  }
})

todosRouter.patch('/:id', async function (req: any, res: any) {
  const { id } = req.params

  const { error, value: body } = todoValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  try {
    const updatedTodo = controller.updateTodo(id, req.body)

    res.send(updatedTodo)
  } catch (err: any) {
    const statusCode = err.code ?? 500

    delete err.code

    res.status(statusCode).send(err)
  }
})

todosRouter.delete('/:id', async function (req: any, res: any) {
  const { id } = req.params

  try {
    const deleteTodo = controller.deleteTodo(id)

    res.send(deleteTodo)
  } catch (err: any) {
    const statusCode = err.code ?? 500

    delete err.code

    res.status(statusCode).send(err)
  }
})

export default todosRouter
