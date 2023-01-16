require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Cors
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'https://taskify-v2.vercel.app',
        'https://taskify-v2.netlify.app',
    ],
    credentials: true,
};
app.use(cors(corsOptions));

// Use cookie parser middleware
app.use(cookieParser());

module.exports = app;
