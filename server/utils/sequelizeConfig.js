const {Sequelize} = require('sequelize')

// const sequelize = new Sequelize('todos', 'postgres', 'postgres', {
//     host: 'localhost',
//     dialect: 'postgres'
// });


const sequelize = new Sequelize('postgres://hczqeczggcokaa:8774cbf35830d5164a854102551b7a748af25272c5bc1cff22e4e0a598aa854a@ec2-54-74-60-70.eu-west-1.compute.amazonaws.com:5432/d295jo865l0vcm', {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})

module.exports = sequelize