// Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = 'mongodb://127.0.0.1:27017/taskify';
mongoose.set('strictQuery', true);
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
