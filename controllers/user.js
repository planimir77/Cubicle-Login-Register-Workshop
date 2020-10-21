const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { jwtSecret, authCookieName, saltRounds, } = config;

const register = async (req, res) => {
    const { username, password, repeatPassword } = req.body;
    try {
        if (password === repeatPassword) {
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(password, salt);

            const user = new User({ 'username': username, 'password': hash, });
            const newUser = await user.save();

            console.log(newUser.toObject());
            return true;
        } else {
            throw new Error('Invalid data');
        }
    } catch (error) {
        console.error('Error : ', error);
    }

};
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username, });

        const success = await bcrypt.compareSync(password, user.password);
        if (success) {

            const token = await jwt.sign({ userId: user._id, }, jwtSecret);
            res.cookie(authCookieName, token, { httpOnly: true, });

            return success;
        }
        return false;

    } catch (error) {
        console.error("Error: ", error);
    }
};
const logout = (req, res) => {
    res.clearCookie(authCookieName);
}

module.exports = { register, login, logout, };