const express = require('express');
const cors = require('cors')
const mailRouter = require('./api.js');

const app = express();
app.use('/api', mailRouter);
app.use(cors());

app.listen(process.env.PORT | 8080);