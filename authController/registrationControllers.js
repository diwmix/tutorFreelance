const User = require('../models/User.js');
const Role = require('../models/Role.js');
const bcrypt = require("bcrypt");

function httpError(message, status) {
    this.message = message;
    this.status = status;
}   

class registrationController {
    async registration(req, res) {
        try {
            
            const { username, email, password, confirmPassword, role} = req.body;
            const findUser = await User.findOne({ email });
            console.log(`Name ${username}`)
            console.log(`Email ${email}`)
            console.log(`Password ${password}`)
            console.log(`Role ${role}`)
            
            if (findUser) {
                throw new httpError('Почта уже использована', 409)
            }


            let userRole;
            
            if (role === 'student') {
                userRole = await Role.findOne({value: "STUDENT"});
            }

            if (role === 'teacher') {
                userRole = await Role.findOne({value: "TEACHER"});
            }

            if (password !== confirmPassword) {
                throw new httpError('Пароли не совпадают', 409)
            }

            if (email === undefined || password === undefined) {
                
                throw new httpError('Почта или пароль не введены', 409)
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hashSync(password, salt);
            const lowercaseEmail = email.toLowerCase();
            const user = await User.create({ username, email: lowercaseEmail, password: hashedPassword, roles: [userRole.value]  });

            await user.save()

            res.status(201)
            console.log(`Добро пожаловать ${username}, регистрация успешна`);
            res.redirect('/auth/login')

        } catch(e) {
            res.status(500).send(e.message)
            console.log(e);
        }
    }
}

module.exports = new registrationController();