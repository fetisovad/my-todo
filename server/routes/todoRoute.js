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

       res.status(201).json('Todo added')
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

router.delete('/delete/:id', async (req, res) => {
    try {
        const {id} = req.query
        const todo = await Todo.findByPk(id)

        await todo.destroy()

        res.status(201).json('Todo delete')
    } catch (e) {
        console.log(e)
    }
})

router.put('/complete/:id', async (req, res) => {
    try {
        const {id} = req.params
        console.log(id)

        const todo = await Todo.findByPk(id)
        todo.done = !todo.done

        await todo.save()

        res.json(todo)
    } catch (e) {
        console.log({e})
    }
})

module.exports= router