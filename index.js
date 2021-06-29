const dotenv = require('dotenv');
dotenv.config({
        path: `${__dirname}/.env.${process.env.NODE_ENV}`
    }
);

const express = require('express');
const cors = require('cors')
const mailRouter = require('./src/api.js');

const app = express();
app.use('/api', mailRouter);
app.use(cors());

app.listen(process.env.PORT || 3000);