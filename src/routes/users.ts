import express from 'express'
import { UsersController } from '../controllers/users'
import User from '../models/user'

const usersRouter = express.Router();

const controller = new UsersController();

usersRouter.get('/', async function (req: any, res: any) {
    const users = await User.find({});

    res.send(users);
})

usersRouter.get('/:id', async function (req: any, res: any) {
    const { id } = req.params

    if (!id) return res.status(400).send('Id not present')

    const foundUser_res = controller.getTodo(id);

    return res.send(foundUser_res)
})

usersRouter.post('/', async function (req: any, res: any) {
    const username = req.body?.username
    const name = req.body?.name

    if (!username) return res.status(400).send('username is not present')
    if (!name) return res.status(400).send('name is not present')

    const newUser_res = controller.createUser(req.body);

    res.send(newUser_res)
})

usersRouter.patch('/:id', async function (req: any, res: any) {
    const { id } = req.params

    if (!id) return res.status(400).send('Id not present')

    const username = req.body?.username
    const name = req.body?.name

    if (!username) return res.status(400).send('username is not present')
    if (!name) return res.status(400).send('name is not present')

    const updatedUser_res = controller.updateUser(id, req.body)

    res.send(updatedUser_res);
})

usersRouter.delete('/:id', async function (req: any, res: any) {
    const { id } = req.params

    if (!id) return res.status(400).send('Id not present')

    const deleteUser_res = controller.deleteUser(id);

    res.send(deleteUser_res)
})

export default usersRouter
