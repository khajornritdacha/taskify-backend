// TODO: Reduce access token lifetime when

require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const saltRounds = 10;

let refreshTokens = [];

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1 day',
    });
}

const grantToken = (req, res) => {
    const refreshToken =
        req.cookies.refreshToken && req.cookies.refreshToken.split(' ')[1];

    console.log('GrantToken: ', refreshToken);

    if (!refreshToken) return res.sendStatus(401);
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken({ email: user.email });
        return res.json({ accessToken });
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    console.log('Login: ', email, password);

    if (!email || !password) {
        return res
            .status(400)
            .send({ message: 'Please fill email and password' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user)
        return res.status(400).send({ message: 'No user with this email' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send({ message: 'Password is wrong' });

    // Send access token and refresh token
    const accessToken = generateAccessToken({ email: user.email });
    const refreshToken = jwt.sign(
        { email: user.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7 days' }
    );
    refreshTokens.push(refreshToken);

    res.cookie('refreshToken', 'Bearer ' + refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 24 * 60 * 60 * 7000,
    });

    // console.log(res.cookies);

    return res.status(200).json({ accessToken });
};

const logout = (req, res) => {
    console.log('Logout cookies', req.cookies);
    const refreshToken =
        req.cookies.refreshToken && req.cookies.refreshToken.split(' ')[1];
    if (refreshToken == null) return res.sendStatus(401);
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    return res.sendStatus(204);
};

const register = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .send({ message: 'Please fill email and password' });
    }

    // Check existing account
    let user = await User.findOne({ email });
    if (user) return res.status(400).send({ message: 'email is used' });

    // Create new account
    // Hashing password first
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    user = new User({ email, password: hashedPassword });
    await user.save();

    res.sendStatus(201);
};

module.exports = {
    grantToken,
    login,
    logout,
    register,
};
