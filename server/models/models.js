const sequelize = require('../utils/sequelizeConfig')
const {DataTypes} = require("sequelize");

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

const Todo = sequelize.define('Todo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    text: {
        type: DataTypes.STRING,
    },
    userId: {
        type: DataTypes.INTEGER
    },
    done: {
        type: DataTypes.BOOLEAN
    }
})

module.exports = {
    User,
    Todo
}