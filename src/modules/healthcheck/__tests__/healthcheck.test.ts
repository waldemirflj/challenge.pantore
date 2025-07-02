import request from 'supertest';

import { App } from '../../../express';
import { AppDataSourceTest } from '../../../config/datasource.test-config';

let app: App;

beforeAll(async () => {
  app = new App(AppDataSourceTest);
  await app.start();
});

afterAll(async () => {
  await AppDataSourceTest.destroy();
});

describe('Verifica se o servidor foi instanciado corretamente', () => {
  it('GET / deve retornar 200', async () => {
    const res = await request(app.instance).get('/');

    expect(res.statusCode).toBe(200);
    expect(typeof res.body).toBe('object');
    expect(res.body.message).toBe('Welcome.');
  });
});
