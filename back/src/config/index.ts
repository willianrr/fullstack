import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './src/db/database.sqlite', 
  logging: false,                   
});
