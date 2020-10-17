const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 9;


const register = async (requestBody) => {
    const { username, password, repeatPassword } = requestBody;
    try {
        if (password === repeatPassword) {

            bcrypt.genSalt(saltRounds, (error, salt) => {
                if (error) throw err;
                bcrypt.hash(password, salt, async (err, hash) => {
                    if (err) throw err;

                    const user = new User({ 'username': username, 'password': hash, });
                    const result = await user.save();
                    console.log(result.toObject());
                });
            });

        } else {
            throw new Error('Invalid data');
        }
    } catch (error) {
        console.error('Error : ', error);
    }

}

module.exports = { register, };