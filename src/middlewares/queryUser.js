const User = require('../models/User');

const queryUser = async (req, res, next) => {
    try {
        const { email } = req.user;
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(401)
                .json({ message: 'There is no user with this email' });
        }
        req.user = user;
        next();
    } catch (err) {
        console.log('Error at queryUser middleware');
        return res.sendStatus(500);
    }
};

module.exports = {
    queryUser,
};
