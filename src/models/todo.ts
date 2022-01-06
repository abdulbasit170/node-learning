import mongoose from 'mongoose'

const schema = new mongoose.Schema({ value: 'string' })

export const Todo = mongoose.model('Todo', schema)

// export default  mongoose.model('Todo', schema)
