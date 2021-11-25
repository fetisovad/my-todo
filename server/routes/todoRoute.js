const {Router} = require('express')
const {Todo} = require("../models/models");

const router = Router()

router.post('/add', async (req, res) => {
   try {
       const {text, userId} = req.body.todoItem

       await Todo.create({
           text,
           done: false,
           userId
       })
   } catch (e) {
       console.log(e)
   }
})

router.get('/', async (req, res) => {
    try {
        const {userId} = req.query

        const todos = await Todo.findAll({where:{userId}})

        res.json(todos)
    } catch (e) {
        console.log(e)
    }
})

module.exports= router