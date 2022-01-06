import Todo, { TodoPayload } from '../models/todo'

export class TodosController {
  createTodo = async (data: TodoPayload) => {
    const { value } = data

    const newTodo = new Todo({ value })
    await newTodo.save()

    return newTodo
  }
}
