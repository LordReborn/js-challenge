const mongoose = require('mongoose');
const express = require('express');
const x = express();
const app = require("./app");

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
x.set('port', process.env.PORT || 4000);

// starting the server
x.listen(x.get('port'), () => {
    console.log(`Server on port ${x.get('port')}`);
});

}

start();