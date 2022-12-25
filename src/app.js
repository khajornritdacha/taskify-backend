const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Cors
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://127.0.0.1:5173',
        'https://taskify-three.vercel.app',
    ],
    credentials: true,
};
app.use(cors(corsOptions));

module.exports = app;
