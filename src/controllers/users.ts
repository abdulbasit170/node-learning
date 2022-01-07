import User, { UserPayload } from '../models/user';


export class UsersController {
    createUser = async (data: UserPayload) => {
        const { username, name } = data

        const newUser = new User({ username, name })

        await newUser.save();

        return newUser
    }
}
