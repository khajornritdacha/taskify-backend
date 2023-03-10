const router = require('express').Router();

const userService = require('../services/userServices');

router.get('/', (req, res) => {
    // console.log(req.body);
    res.send('Auth home page');
});

router.post('/token', userService.grantToken);

router.post('/login', userService.login);

router.post('/logout', userService.logout);

router.post('/register', userService.register);

module.exports = router;
