import dotenv from 'dotenv';
dotenv.config();

import { App } from './express';
import { AppDataSource } from './config/datasource';

const app = new App(AppDataSource);

app.start().then(() => {
  app.instance.listen(process.env.PORT, () => {
    console.info(`server is running in ${process.env.NODE_ENV}: ${new Date()}`);
  });
});
