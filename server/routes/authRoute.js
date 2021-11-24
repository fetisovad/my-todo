const {Router} = require('express')
const {User} = require("../models/models");
const bcrypt = require('bcrypt');

const router = Router()

router.post('/registration', async (req, res) => {
   try {
       const {email, password} = req.body.dataForm
       console.log(email, password)

       const isUser = await User.findOne({where:{email}})
       if(isUser) {
           return res.status(300).json('Данный email уже занят, попробуйте другой.')
       }

       const hashPassword = await bcrypt.hash(password, 10)

       await User.create({
           email,
           password: hashPassword
       })

       return res.status(201).json('Регистрация прошла успешно')
   } catch (e) {
       console.log(e)
   }

})

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body.formData
        console.log(email, password)

        const isUser = await User.findOne({where:{email}})
        if(!isUser) {
            return res.status(400).json('Такой email не зарегистрирован')
        }

        const user = await User.findOne({where:{email}})
        console.log(user)

        const unHashPassword = await bcrypt.compare(password, user.password)
        if(!unHashPassword) {
            return res.status(400).json('Пароль неверный')
        }

        res.json({userId: user.id})
        return res.status(201).json('Вход выполнен')
    } catch (e) {
        console.log(e)
    }
})

module.exports = router