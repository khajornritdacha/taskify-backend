// Set up mongoose connection
require('dotenv').config();
const mongoose = require('mongoose');
const mongoDB = process.env.DB_URL;
mongoose.set('strictQuery', true);
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
