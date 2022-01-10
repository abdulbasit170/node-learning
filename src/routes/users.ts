import express from 'express'
import { UsersController } from '../controllers/users'
import { registerUserValidation } from '../utils/validations'

const usersRouter = express.Router()

const controller = new UsersController()

usersRouter.get('/', async function (req: any, res: any) {
  const users = await controller.getUsers()

  res.send(users)
})

usersRouter.get('/:id', async function (req: any, res: any) {
  const { id } = req.params
  if (!id) return res.status(400).send('Id not present')

  try {
    const foundUser = await controller.getUser(id)
    res.send(foundUser)
  } catch (err: any) {
    const statusCode = err.code ?? 500

    delete err.code

    res.status(statusCode).send(err)
  }
})

usersRouter.post('/', async function (req: any, res: any) {
  const { error, value: body } = registerUserValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  try {
    const newUser = await controller.createUser(body)
    res.send(newUser)
  } catch (err: any) {
    const statusCode = err.code ?? 500

    delete err.code

    res.status(statusCode).send(err)
  }
})

usersRouter.patch('/:id', async function (req: any, res: any) {
  const { id } = req.params
  const username = req.body?.username
  const name = req.body?.name

  if (!username) return res.status(400).send('username is not present')
  if (!name) return res.status(400).send('name is not present')

  const updatedUser = await controller.updateUser(id, req.body)

  res.send(updatedUser)
})

usersRouter.delete('/:id', async function (req: any, res: any) {
  const { id } = req.params

  const deleteUser = await controller.deleteUser(id)

  res.send(deleteUser)
})

export default usersRouter
