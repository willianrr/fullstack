import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db/database.sqlite', 
  logging: false,                   
});
