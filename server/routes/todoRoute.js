const {Router} = require('express')
const {Todo, User} = require("../models/models");

const router = Router()

router.post('/add', async (req, res) => {
   try {
       const {title, userId, description, status, priority, endDate} = req.body.todoItem

       const user = await User.findByPk(userId)

       await Todo.create({
           title,
           done: false,
           userId,
           description,
           status,
           priority,
           author: user,
           responsible: user,
           endDate
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
        const user = await User.findByPk(userId)

        res.json({todos, user})
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

       const  dbTodo = await Todo.findByPk(todo.id)
       dbTodo.title = todo.title
       dbTodo.description = todo.description
       dbTodo.priority = todo.priority
       dbTodo.status = todo.status
       dbTodo.endDate = todo.endDate

       await dbTodo.save()

       res.json(dbTodo)
   } catch (e) {
       console.log(e)
   }
})

module.exports= router