const express = require('express');
const app = express();
const cors = require('cors');

const todo = require('./route/todo');

app.use(express.json());
app.use(cors());

app.use('/api/todos', todo);

module.exports = app;