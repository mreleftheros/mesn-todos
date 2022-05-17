const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const todo = require('./route/todo');
const auth = require('./route/auth');

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api/todos', todo);
app.use('/api/auth', auth);

module.exports = app;
