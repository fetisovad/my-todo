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
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    secondName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    patronymic: {
        type: DataTypes.STRING,
        allowNull: false
    },
    executive: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING
    }
})

const Todo = sequelize.define('Todo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
    },
    userId: {
        type: DataTypes.INTEGER
    },
    done: {
        type: DataTypes.BOOLEAN
    },
    description: {
        type: DataTypes.STRING,
    },
    priority: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.STRING
    },
    author: {
        type: DataTypes.JSON
    },
    responsible: {
        type: DataTypes.JSON
    }
})

module.exports = {
    User,
    Todo
}