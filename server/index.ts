import express from 'express';
import dotenv from 'dotenv';
import sequelize from './db';
import cors from 'cors';
import models from './models/model';
import router from './Routers/router';

dotenv.config();

const PORT = process.env.PORT || 7000;
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () =>
      console.log('\x1b[1;35m', `==== Server was started on ${PORT} port =====`)
    );
  } catch (error) {
    console.log(error.message);
  }
};

start();
