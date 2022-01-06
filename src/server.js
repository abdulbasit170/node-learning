// imported express
const express = require('express');
// initialized express
const app = express();

// use body parser middleware
app.use(express.json());

// get request to respond simple string
app.get('/', function (req, res) {
  res.send('Hello World')
});

// Sample Todo tasks' variables
const todo1 = {
  id: 0,
  value: 'default1',
}

const todo2 = {
  id: 1,
  value: 'default2',
}
// create array of the tasks above
const todos = [todo1, todo2]

// get request for all todo tasks
app.get('/todos', function (req, res) {
  res.send(todos);
});

// get request for single todo
app.get('/todos/:id', function (req, res) {
  const {
    id
  } = req.params // object destructuring

  if (!id) return res.status(400).send('Id not present');

  const foundTodo = todos.find((t) => t.id == id);
  if (!foundTodo) return res.status(400).send(`No Todo found against id: ${id}`);

  return res.send(foundTodo)
})

// create todo
app.post('/todos', function (req, res) {
  let value
  if (req.body && req.body.value) value = req.body.value

  if (!value) return res.status(400).send('value is not present')

  const newTodo = {
    id: todos.length,
    value,
  }

  todos.push(newTodo)

  res.send(newTodo)
})

// update todo
app.patch('/todos/:id', function (req, res) {
  const {
    id
  } = req.params // object destructuring

  if (!id) return res.status(400).send('Id not present')

  const foundTodo = todos.find((t) => t.id == id)
  if (!foundTodo) return res.status(400).send(`No Todo found against id: ${id}`)

  let value
  if (req.body && req.body.value) value = req.body.value

  if (!value) return res.status(400).send('value is not present')

  foundTodo.value = value

  res.send(foundTodo)
})

// delete todo 
app.delete('/todos/:id', function (req, res) {
  const {
    id
  } = req.params // object destructuring

  if (!id) return res.status(400).send('Id not present')

  const foundTodoIndex = todos.findIndex((t) => t.id == id)
  if (foundTodoIndex == -1)
    return res.status(400).send(`No Todo found against id: ${id}`)

  todos.splice(foundTodoIndex, 1)

  res.send('task is deleted')
});

// app listening on port 3000
app.listen(3000);