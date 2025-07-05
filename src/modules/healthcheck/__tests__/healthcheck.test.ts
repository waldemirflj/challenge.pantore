import request from 'supertest';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { App } from '../../../express';
import { AppDataSourceTest } from '../../../config/datasource.test-config';

let app: import('express').Express;

beforeAll(async () => {
  const appInstance = new App(AppDataSourceTest);
  await appInstance.start();

  app = appInstance.instance;

  // await AppDataSourceTest.initialize();
  await AppDataSourceTest.synchronize(true); // força a limpaza do banco
});

afterEach(async () => {
  if (AppDataSourceTest.isInitialized) {
    await AppDataSourceTest.synchronize(true);
  }
});

afterAll(async () => {
  if (AppDataSourceTest.isInitialized) {
    await AppDataSourceTest.destroy();
  }
});

describe('Verifica se o servidor foi instanciado corretamente', () => {
  it('GET / deve retornar 200', async () => {
    const res = await request(app).get('/');

    expect(res.statusCode).toBe(200);
    expect(typeof res.body).toBe('object');
    expect(res.body.message).toBe('Welcome.');
  });
});
