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
      .use(express.json())
      .use(routes);
  }

  async start(): Promise<void> {
    try {
      await this.dataSource.initialize();
      console.log('banco conectado');
    } catch (error) {
      console.error('Erro ao conectar no banco', error);
    }
  }
}
