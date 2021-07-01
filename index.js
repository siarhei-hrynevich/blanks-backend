const dotenv = require('dotenv');
dotenv.config({
        path: `${__dirname}/.env.${process.env.NODE_ENV}`
    }
);

const express = require('express');
const cors = require('cors')
const mailRouter = require('./src/api.js');

const app = express();

app.use(cors());

app.use('/api', mailRouter);

app.listen(process.env.PORT || 3000);