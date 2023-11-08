const User = require('../models/User.js');
const bcrypt = require('bcrypt');


function httpError(message, status) {
    this.message = message;
    this.status = status;
}


class loginController {
    async login(req, res) {
        try {
            const { email, password} = req.body;

            const lowercaseEmail = email.toLowerCase();
            const findUser = await User.findOne({ email: lowercaseEmail });
            await User.deleteOne({ username: "test" })
            if (!findUser) {
                throw new httpError('Пользователь не найден', 409)
            }
            const isPasswordValid = bcrypt.compareSync(password, findUser.password);

            if (!isPasswordValid) {
                throw new httpError('Неправильный пароль', 409)
            } 

            req.session.user = { 
                id: findUser._id, 
                username: findUser.username, 
                avatar: findUser.avatar, 
                bio: findUser.bio,
            }
            
            res.status(201)
            res.redirect('/profile')

        } catch (e) {
            res.status(500).send(e.message)
            console.log(e);
        }       
    }
}

module.exports = new loginController();