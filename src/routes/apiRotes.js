const router = require('express').Router();
const { authenticateToken } = require('../middlewares/authMiddleware');

// router.use(authenticateToken);

// localhost:3000/api
router.get('/', (req, res) => {
    res.send('API Home page');
});

router.route('/todos').get().post().put();

module.exports = router;
