const express = require('express');
const morgan = require('morgan');
const app = express();

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// routes
app.use(require('./routes'));
app.use('/api/users', require('./routes/users'));
app.use('/api/registry', require('./routes/registry'));

module.export=app;
