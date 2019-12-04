import Sequelize from 'sequelize'
import sequelize from '../lib/mysql'

const Users = sequelize.define("users", {
    id_user : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    name : {
        type : Sequelize.STRING
    },
    username : {
        type : Sequelize.STRING,
        unique : true
    },
    password : {
        type : Sequelize.STRING,
    },
    email : {
        type : Sequelize.STRING,
        unique : true
    },
    phone : {
        type : Sequelize.STRING,
        unique : true
    },
    createdAt : {
        type : Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    updatedAt : {
        type : Sequelize.DATE,
    },
    token : {
        type : Sequelize.STRING
    },
})

export default Users