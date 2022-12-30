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
        return res.status(500).send(err);
    }
};

const addTodo = async (req, res) => {
    try {
        const user = req.user;

        const { todoText, isDone } = req.body;

        console.log('Add Todo: ', todoText, isDone);

        if (!todoText || typeof isDone !== 'boolean')
            return res.status(400).json({ message: 'data is missing' });

        const newTodo = new Todo({ todoText });
        await newTodo.save();
        if (isDone) user.toRemoves.push(newTodo._id);
        else user.todos.push(newTodo._id);
        await user.save();

        return res.sendStatus(201);
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

const editTodoList = async (req, res) => {
    try {
        const user = req.user;

        const { todos, toRemoves } = req.body;

        if (todos) user.todos = todos;
        if (toRemoves) user.toRemoves = toRemoves;

        await user.save();

        return res.sendStatus(200);
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

const editTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findById(id);
        if (!todo) return res.status(404).json({ message: 'Invalid Id' });
        if (!req.body.todoText)
            return res.status(400).json({ message: 'Todo text is missing' });

        todo.todoText = req.body.todoText;
        await todo.save();
        return res.sendStatus(200);
    } catch (err) {
        console.log(err);
        console.log('Error at editTodo');
        return res.status(500).send(err);
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
        return res.status(500).send(err);
    }
};

module.exports = {
    addTodo,
    editTodoList,
    getTodo,
    editTodo,
    deleteTodo,
};
