import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  host: 'localhost',
  database:'book_management_system',
  username:  'root',
  password:  '',
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  }
});

export default sequelize;




