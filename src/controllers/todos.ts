import Todo, { TodoPayload } from '../models/todo';


export class TodosController {
  // function to create a todo. this functon accepts data with type of TodoPayLoad
  createTodo = async (data: TodoPayload) => {
    const { value } = data

    // create new instance of the new todo scehma with the recieved value. 
    const newTodo = new Todo({ value })

    // mongoose db function to save the data with await
    await newTodo.save();

    // return the created item
    return newTodo
  }
}
