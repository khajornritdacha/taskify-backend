const router = require('express').Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const { queryUser } = require('../middlewares/queryUser');
const {
    addTodo,
    editTodoList,
    getTodo,
    editTodo,
    deleteTodo,
} = require('../services/todoServices');

router.use(authenticateToken, queryUser);

// localhost:3000/api
router.get('/', (req, res) => {
    return res.json(req.user);
});

// router.route('/todos').get(getTodo).post(addTodo).put(editTodo);

router.get('/todos', getTodo);
router.post('/todos', addTodo);
router.put('/todos', editTodoList);
router.put('/todos/:id', editTodo);
router.delete('/todos/:id', deleteTodo);

module.exports = router;
