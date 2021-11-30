const {Sequelize} = require('sequelize')

// const sequelize = new Sequelize('todos', 'postgres', 'postgres', {
//     host: 'localhost',
//     dialect: 'postgres'
// });


const sequelize = new Sequelize('d295jo865l0vcm', 'hczqeczggcokaa', '8774cbf35830d5164a854102551b7a748af25272c5bc1cff22e4e0a598aa854a', {
    host: 'ec2-54-74-60-70.eu-west-1.compute.amazonaws.com',
    dialect: 'postgres'
});

module.exports = sequelize