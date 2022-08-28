const express= require('express');

const app = express();
const readerRouter = require('../src/routes/reader');
const bookRouter = require('../src/routes/book')

app.use(express.json());
app.use('/reader', readerRouter);
app.use('/book', bookRouter);

module.exports = app;