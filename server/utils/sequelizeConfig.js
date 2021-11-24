const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('todos', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize