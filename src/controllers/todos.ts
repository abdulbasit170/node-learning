import Todo, { TodoPayload } from '../models/todo';


export class TodosController {

  getTodo = async (id: number) => {
    const foundTodo = await Todo.findOne({ _id: id })

    if (!foundTodo)
      throw {
        code: 403,
        message: `No Todo found against id: ${id}`
      }

    return foundTodo
  }

  createTodo = async (data: TodoPayload) => {
    const { value } = data

    const newTodo = new Todo({ value })

    await newTodo.save();

    return newTodo
  }

  updateTodo = async (id: number, data: TodoPayload) => {
    const foundTodo = await Todo.findOne({ _id: id });

    if (!foundTodo)
      throw {
        code: 403,
        message: `No Todo found against id: ${id}`
      }

    const { value } = data;

    const updatedTodo = await Todo.findByIdAndUpdate(id, { value }, { new: true })

    return updatedTodo
  }

  deleteTodo = async (id: number) => {
    const foundTodo = await Todo.findOne({ _id: id });

    if (!foundTodo)
      throw {
        code: 403,
        message: `No Todo found against id: ${id}`
      }

    await foundTodo.remove();

    return 'task is deleted';
  }

}
