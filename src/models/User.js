const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    todos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Todo',
        },
    ],
    toRemoves: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Todo',
        },
    ],
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
