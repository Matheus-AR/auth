const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/env.json');
const userRoute = require('./routes/userRoute');
const produtoRoute = require('./routes/produtoRoute');
const app = express();

app.use(express.json());

app.use('/users', userRoute);
app.use('/produtos', produtoRoute);

mongoose.connect(config.url)
    .then(app.listen(config.porta, () => {
        console.log('API está ON');
    }))
    .catch(error => {
        console.log('Deu ruim', error.message);
    });