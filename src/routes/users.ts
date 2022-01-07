import express from 'express'
import { UsersController } from '../controllers/users'
import User from '../models/user'

// initiate the express router
const usersRouter = express.Router();

// create new controller instance
const controller = new UsersController();

usersRouter.get('/', async function (req: any, res: any) {
    const users = await User.find({});

    res.send(users);
})

// usersRouter.get('/:id', async function (req: any, res: any) {
//     const { id } = req.params // object destructuring

//     // check if id is present in the request
//     if (!id) return res.status(400).send('Id not present')

//     // findOne - mongoose db function to fetch the item with the id
//     const foundTodo = await Todo.findOne({ _id: id })

//     // if item is not found in the database
//     if (!foundTodo) return res.status(400).send(`No Todo found against id: ${id}`)

//     return res.send(foundTodo)
// })

usersRouter.post('/', async function (req: any, res: any) {
    const username = req.body?.username
    const name = req.body?.name

    if (!username) return res.status(400).send('username is not present')
    if (!name) return res.status(400).send('name is not present')

    const newUser = controller.createUser(req.body);

    res.send(newUser)
})

// usersRouter.patch('/:id', async function (req: any, res: any) {
//     const { id } = req.params // object destructuring

//     if (!id) return res.status(400).send('Id not present')

//     // findOne - mongoose db - found 1 item with id
//     const foundTodo = await Todo.findOne({ _id: id })

//     if (!foundTodo) return res.status(400).send(`No Todo found against id: ${id}`)

//     // if body and value is available in the request
//     const value = req.body?.value

//     if (!value) return res.status(400).send('value is not present')

//     // findByIdAndUpdate mongoose db function to find and save
//     const updatedTodo = await Todo.findByIdAndUpdate(id, { value }, { new: true })

//     // return the updated item
//     res.send(updatedTodo);
// })

// usersRouter.delete('/:id', async function (req: any, res: any) {
//     const { id } = req.params // object destructuring

//     if (!id) return res.status(400).send('Id not present')

//     const foundTodo = await Todo.findOne({ _id: id })
//     if (!foundTodo) return res.status(400).send(`No Todo found against id: ${id}`)

//     // mongoose db function to delete the item
//     await foundTodo.remove()

//     res.send('task is deleted')
// })


export default usersRouter
