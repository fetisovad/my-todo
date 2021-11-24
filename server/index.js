const express = require('express')
const authRoute = require('./routes/authRoute')
const sequelize = require('./utils/sequelizeConfig')

const app = express();
const PORT = 8000

// app.use(express.json({extended: true}))
app.use(express.json())
app.use('/api/auth/', authRoute)



async function start() {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, async (req, res) => {
        console.log(`Server started on port ${PORT}`)
    })
}

start()