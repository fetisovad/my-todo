const express = require('express')
const authRoute = require('./routes/authRoute')
const todoRoute = require('./routes/todoRoute')
const sequelize = require('./utils/sequelizeConfig')

const app = express();
const PORT = 8000

app.use(express.json({extended: true}))
app.use('/api/auth/', authRoute)
app.use('/api/todo/', todoRoute)



async function start() {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, async (req, res) => {
        console.log(`Server started on port ${PORT}`)
    })
}

start()