import express, { Express } from 'express';
import cors from 'cors';
import { DataSource } from 'typeorm';
import { routes } from './routes';

export class App {
  public readonly instance: Express;

  constructor(private dataSource: DataSource) {
    this.instance = express()
      .use(cors())
      .use(express.urlencoded({ extended: true }))
      .use(express.json());
  }

  async start(): Promise<void> {
    try {
      await this.dataSource.initialize();

      // rotas
      this.instance.use(routes(this.dataSource));
    } catch (error) {
      console.error('Erro ao conectar no banco', error);
    }
  }
}
