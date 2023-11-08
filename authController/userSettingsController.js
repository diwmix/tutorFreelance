const User = require('../models/User.js');
const sharp = require('sharp')
const uuid = require('uuid');
const fs = require('fs')

class userSettingsController {
    async userSettings(req, res) {
        try {
            const timestamp = Date.now();
            const name = uuid.v4()
            const uniqueAvatarName = `${name}.png?timestamp=${timestamp}`;
            sharp(req.file.path)
            .toFormat('png')
            .toFile('public/uploads/' + name + '.png', async (err, info) => {
                if (err) {
                    return res.status(500).send('Помилка під час обробки зображення');
                }

                const userId = req.session.user.id;
                const fileName = `${name}.png`
                console.log(fileName)
                
                const findUser = await User.findByIdAndUpdate( userId, { avatar: fileName });
                req.session.user.avatar = uniqueAvatarName
                findUser.save()

                fs.unlink(req.file.path, (err) => {
                    if (err) {
                      console.error('Помилка під час видалення файлу', err);
                    }
                });
                res.redirect('/profile')
            })
            

        } catch (e) {
            res.status(500).send(e.message)
            console.log(e);
            
        
            }
    }
}

module.exports = new userSettingsController();