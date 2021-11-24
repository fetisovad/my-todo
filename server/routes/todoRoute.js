const {Router} = require('express')
const {Todo} = require("../models/models");

const router = Router()

router.post('/add', async (req, res) => {
   try {
       // const {text, userId} = req.body.todoItem
       const {text} = req.body.todoItem
       // console.log(text, userId)

       const todo = await Todo.create({
           text,
           done: false,
           // userId
       })

   } catch (e) {
       console.log(e)
   }


})


module.exports= router