const express = require('express')
const app = express()

app.use(express.json())

app.get('/', function (req, res) {
  res.send('Hello World')
})

const todo1 = {
  id: 0,
  value: 'default1',
}

const todo2 = {
  id: 1,
  value: 'default2',
}

const todos = [todo1, todo2]

app.get('/todos', function (req, res) {
  res.send(todos)
})

app.get('/todos/:id', function (req, res) {
  const { id } = req.params // object destructuring

  if (!id) return res.status(400).send('Id not present')

  const foundTodo = todos.find((t) => t.id == id)
  if (!foundTodo) return res.status(400).send(`No Todo found against id: ${id}`)

  return res.send(foundTodo)
})

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

app.patch('/todos/:id', function (req, res) {
  const { id } = req.params // object destructuring

  if (!id) return res.status(400).send('Id not present')

  const foundTodo = todos.find((t) => t.id == id)
  if (!foundTodo) return res.status(400).send(`No Todo found against id: ${id}`)

  let value
  if (req.body && req.body.value) value = req.body.value

  if (!value) return res.status(400).send('value is not present')

  foundTodo.value = value

  res.send(foundTodo)
})

app.delete('/todos/:id', function (req, res) {
  const { id } = req.params // object destructuring

  if (!id) return res.status(400).send('Id not present')

  const foundTodoIndex = todos.findIndex((t) => t.id == id)
  if (foundTodoIndex == -1)
    return res.status(400).send(`No Todo found against id: ${id}`)

  todos.splice(foundTodoIndex, 1)

  res.send('task is deleted')
})

app.listen(3000)
