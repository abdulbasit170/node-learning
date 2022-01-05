const express = require('express')
const app = express()

// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

app.get('/todo', function (req, res) {
  res.send('Rendering All Todosiiiiii')
});

app.post('/todo', function (req, res) {
  res.send('Creating a new todo task')
});

app.patch('/todo/:id', function (req, res) {
  res.send('updating the todo task')
});

app.delete('/todo/:id', function (req, res) {
  res.send('deleting the task')
});

app.listen(3000);
