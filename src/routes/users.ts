import express from 'express'
import { UsersController } from '../controllers/users'
import { registerUserValidation, updateUserValidation } from '../utils/validations'

const usersRouter = express.Router()

const controller = new UsersController()

usersRouter.get('/', async function (req: any, res: any) {
  try {
    const users = await controller.getUsers()

    res.send(users)
  } catch (err: any) {
    const statusCode = err.code ?? 500

    delete err.code

    res.status(statusCode).send(err)
  }
})

usersRouter.get('/:id', async function (req: any, res: any) {
  const { id } = req.params

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

  const { error, value: body } = updateUserValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  try {
    const updatedUser = await controller.updateUser(id, body)

    res.send(updatedUser)
  } catch (err: any) {
    const statusCode = err.code ?? 500
    delete err.code

    res.status(statusCode).send(err)
  }
})

usersRouter.delete('/:id', async function (req: any, res: any) {
  const { id } = req.params

  try {
    const deleteUser = await controller.deleteUser(id)
    res.send(deleteUser)

  } catch (err: any) {
    const statusCode = err.code ?? 500
    delete err.code
    res.status(statusCode).send(err)
  }
})

export default usersRouter
