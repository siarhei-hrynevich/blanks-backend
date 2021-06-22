const express = require('express');
const mailRouter = require('./api.js');

const app = express();
app.use('/api', mailRouter);
app.use(express.static(__dirname + '/templates/styles'));

app.listen(process.env.PORT | 8080);