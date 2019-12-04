import { dbSettings } from '../config/config'
import sequelize from 'sequelize'

const Sequelize = new sequelize(dbSettings.database, dbSettings.username, dbSettings.password, {
    host : dbSettings.host,
    dialect : 'mysql'
})

Sequelize
.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default Sequelize