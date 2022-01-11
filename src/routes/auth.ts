import express from 'express'
import { AuthController } from '../controllers/auth'
import { authenticateRefreshToken } from '../middlewares/authenticateToken'
import { loginUserValidation } from '../utils/validations'

const authRouter = express.Router()

const controller = new AuthController()

authRouter.post('/login', async function (req: any, res: any) {
  const { error, value: body } = loginUserValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  try {
    const response = await controller.login(body)

    res.send(response)
  } catch (err: any) {
    const statusCode = err.code ?? 500

    delete err.code

    res.status(statusCode).send(err)
  }
})

authRouter.post(
  '/refresh',
  authenticateRefreshToken,
  async function (req: any, res: any) {
    try {
      const response = await controller.refresh(req.user.username)

      res.send(response)
    } catch (err: any) {
      const statusCode = err.code ?? 500

      delete err.code

      res.status(statusCode).send(err)
    }
  }
)

export default authRouter
