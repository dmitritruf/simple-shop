import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DB_NAME, 'postgres', 'joker', {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
});

export default sequelize;
