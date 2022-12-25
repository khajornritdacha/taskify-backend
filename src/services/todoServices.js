const User = require('../models/User');
const Todo = require('../models/Todo');

const getTodo = async (req, res) => {
    try {
        const user = req.user;

        const { todos, toRemoves } = await user.populate([
            'todos',
            'toRemoves',
        ]);

        return res.json({
            todos,
            toRemoves,
        });
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
};

const addTodo = async (req, res) => {
    try {
        const user = req.user;

        const { todoText, isDone } = req.body.data;

        if (!todoText || !isDone)
            return res.status(400).json({ message: 'data is missing' });

        const newTodo = new Todo({ todoText });
        await newTodo.save();
        if (isDone) user.toRemoves.push(newTodo._id);
        else user.todos.push(newTodo._id);
        await user.save();

        return res.sendStatus(201);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
};

const editTodoList = async (req, res) => {
    try {
        const user = req.user;

        const { todos, toRemoves } = req.body.data;

        if (todos) user.todos = todos;
        if (toRemoves) user.toRemoves = toRemoves;

        await user.save();

        return res.sendStatus(200);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
};

const editTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findById(id);
        if (!todo) return res.sendStatus(404);
        if (!req.body.todoText) return res.sendStatus(400);

        todo.todoText = req.body.todoText;
        await todo.save();
        return res.sendStatus(200);
    } catch (err) {
        console.log(err);
        console.log('Error at editTodo');
        return res.sendStatus(500);
    }
};

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        await Todo.findByIdAndDelete(id);
        return res.sendStatus(200);
    } catch (err) {
        console.log(err);
        console.log('Error at delete Todo');
        return res.sendStatus(500);
    }
};

module.exports = {
    addTodo,
    editTodoList,
    getTodo,
    editTodo,
    deleteTodo,
};
