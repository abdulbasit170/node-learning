import express from 'express'
import { TodosController } from '../controllers/todos'
import Todo from '../models/todo'

const todosRouter = express.Router();

const controller = new TodosController();

todosRouter.get('/', async function (req: any, res: any) {
  const todos = await Todo.find({});

  res.send(todos);
})

todosRouter.get('/:id', async function (req: any, res: any) {
  const { id } = req.params

  if (!id) return res.status(400).send('Id not present')

  const foundTodo_res = controller.getTodo(id);

  return res.send(foundTodo_res)
})

todosRouter.post('/', async function (req: any, res: any) {
  const value = req.body?.value

  if (!value) return res.status(400).send('value is not present')

  const newTodo_res = controller.createTodo(req.body)

  res.send(newTodo_res)
})

todosRouter.patch('/:id', async function (req: any, res: any) {
  const { id } = req.params

  if (!id) return res.status(400).send('Id not present')

  const value = req.body?.value
  if (!value) return res.status(400).send('value is not present')

  const updatedTodo_res = controller.updateTodo(id, req.body)

  res.send(updatedTodo_res);
})

todosRouter.delete('/:id', async function (req: any, res: any) {
  const { id } = req.params

  if (!id) return res.status(400).send('Id not present')

  const deleteTodo_res = controller.deleteTodo(id);

  res.send(deleteTodo_res)
})

export default todosRouter
