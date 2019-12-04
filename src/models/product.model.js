import Sequelize from 'sequelize'
import sequelize from '../lib/mysql'

const Products = sequelize.define("products", {
    id_product : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    title : {
        type : Sequelize.STRING
    },
    description : {
        type : Sequelize.TEXT
    },
    city : {
        type : Sequelize.STRING
    },
    province : {
        type : Sequelize.STRING
    },
    createdAt : {
        type : Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    updatedAt : {
        type : Sequelize.DATE,
    },
})

export default Products