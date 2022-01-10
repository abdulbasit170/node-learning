import User, { UserPayload } from '../models/user';


export class UsersController {

    getTodo = async (id: number) => {
        const foundUser = await User.findOne({ _id: id })

        if (!foundUser) return `No User found against id: ${id}`

        return foundUser
    }

    createUser = async (data: UserPayload) => {
        const { username, name } = data

        const newUser = new User({ username, name })

        await newUser.save();

        return newUser
    }

    updateUser = async (id: number, data: UserPayload) => {
        const foundUser = await User.findOne({ _id: id });

        if (!foundUser) return `No User found against id: ${id}`;

        const { username, name } = data

        const updatedTodo = await User.findByIdAndUpdate(id, { username, name }, { new: true })

        return updatedTodo
    }

    deleteUser = async (id: number) => {
        const foundUser = await User.findOne({ _id: id });

        if (!foundUser) return `No User found against id: ${id}`;

        await foundUser.remove();

        return 'task is deleted';
    }
}
