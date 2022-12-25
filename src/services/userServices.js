const login = async (req, res) => {
    console.log(req.body);
    res.send('Login Page');
};

const logout = (req, res) => {
    console.log('Logout page');
    res.send('Logout page');
};

const register = async (req, res) => {
    console.log('Register page');
};

module.exports = {
    login,
    logout,
    register,
};
