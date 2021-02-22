const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const app = express();

const start = async () => {
try {
    await mongoose.connect('mongodb+srv://root:root@cluster0.p7d0u.mongodb.net/balance?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
    });
    console.log('Connected to mongoDB');
} catch (error) {
    console.error(error);
}

// settings
app.set('port', process.env.PORT || 4000);

// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// routes
app.use(require('./routes'));
app.use('/api/users', require('./routes/users'));
app.use('/api/registry', require('./routes/registry'));

}

start();