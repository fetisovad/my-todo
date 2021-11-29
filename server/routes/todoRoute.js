const {Router} = require('express')
const {Todo} = require("../models/models");

const router = Router()

router.post('/add', async (req, res) => {
   try {
       const {title, userId, description, status, priority} = req.body.todoItem

       await Todo.create({
           title,
           done: false,
           userId,
           description,
           status,
           priority
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

router.get('/edit/:id', async (req, res) => {
    try {
        const {id} = req.query
        const todo = await Todo.findByPk(id)

        res.json(todo)

    } catch (e) {
        console.log(e)
    }
})

router.put('/edit/:id', async (req, res) => {
   try {
       const todo = req.body.todo
       console.log(todo.id)

       const  dbTodo = await Todo.findByPk(todo.id)
       dbTodo.title = todo.title
       dbTodo.description = todo.description
       dbTodo.priority = todo.priority

       await dbTodo.save()

       res.json(dbTodo)
   } catch (e) {
       console.log(e)
   }
})

module.exports= router