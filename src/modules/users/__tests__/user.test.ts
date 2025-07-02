jest.mock('../../../config/datasource', () => {
  const { AppDataSourceTest } = require('../../../config/datasource.test-config');

  return {
    AppDataSource: AppDataSourceTest,
  };
});

import request from 'supertest';
import { App } from '../../../express';
import { AppDataSourceTest } from '../../../config/datasource.test-config';

let app: App;

beforeAll(async () => {
  app = new App(AppDataSourceTest);

  await app.start();
});

afterEach(async () => {
  await AppDataSourceTest.synchronize(true);
});

afterAll(async () => {
  await AppDataSourceTest.destroy();
});

describe('Usuario', () => {
  describe('GET /api/v1/users', () => {
    it('Deve retornar um array de usuarios vazio', async () => {
      const res = await request(app.instance).get('/api/v1/users');

      expect(res.body).toEqual([]);
      expect(res.statusCode).toBe(200);
    });

    it('Deve retornar um array de usuarios', async () => {
      const data1 = {
        role: 'guest',
        name: 'Teste 1',
        email: 'teste1@teste.com',
        password: 'teste',
      };

      const data2 = {
        role: 'guest',
        name: 'Teste 2',
        email: 'teste2@teste.com',
        password: 'teste',
      };

      await request(app.instance).post('/api/v1/users').send(data1);
      await request(app.instance).post('/api/v1/users').send(data2);
      const res = await request(app.instance).get('/api/v1/users');

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(1);
    });
  });

  describe('POST /api/v1/users', () => {
    it('Deve retornar um usuario', async () => {
      const data = {
        role: 'guest',
        name: 'Teste',
        email: 'teste@teste.com',
        password: 'teste',
      };

      const res = await request(app.instance).post('/api/v1/users').send(data);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('role');
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('email');
      expect(res.body.id).toBe(1);
      expect(res.body.role).toBe(data.role);
      expect(res.body.name).toBe(data.name);
      expect(res.body.email).toBe(data.email);
    });

    it('Deve retornar um erro ao criar um usuario com a role invalida', async () => {
      const data = {
        role: null, // guest, admin ou customer
        name: 'Teste',
        email: 'teste@teste.com',
        password: 'teste',
      };

      await request(app.instance).post('/api/v1/users').send(data);
      const res = await request(app.instance).post('/api/v1/users').send(data);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toBe('Função (role) inválida');
    });

    it('Deve retornar um erro ao criar um usuario com o email ja cadastrado', async () => {
      const data = {
        role: 'guest',
        name: 'Teste',
        email: 'teste@teste.com',
        password: 'teste',
      };

      await request(app.instance).post('/api/v1/users').send(data);
      const res = await request(app.instance).post('/api/v1/users').send(data);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toBe('E-mail já cadastrado');
    });
  });

  describe('GET /api/v1/users/:id', () => {
    it('Deve retornar um array com um usuario', async () => {
      const id = 1;

      const data1 = {
        role: 'guest',
        name: 'Teste 1',
        email: 'teste1@teste.com',
        password: 'teste',
      };

      const data2 = {
        role: 'guest',
        name: 'Teste 2',
        email: 'teste2@teste.com',
        password: 'teste',
      };

      await request(app.instance).post('/api/v1/users').send(data1);
      await request(app.instance).post('/api/v1/users').send(data2);
      const res = await request(app.instance).get(`/api/v1/users/${id}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0].id).toBe(id);
      expect(res.body[0].role).toBe(data1.role);
      expect(res.body[0].name).toBe(data1.name);
      expect(res.body[0].email).toBe(data1.email);
    });

    it('Deve retornar um erro ao buscar um usuario invalido', async () => {
      const id = 2;
      const res = await request(app.instance).get(`/api/v1/users/${id}`);

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toBe('Usuário não cadastrado');
    });
  });

  describe('PUT /api/v1/users/:id', () => {
    it('Deve atualizar um usuario', async () => {
      const data = {
        role: 'guest',
        name: 'Teste',
        email: 'teste@teste.com',
        password: 'teste',
      };

      const user = await request(app.instance).post('/api/v1/users').send(data);
      const userId = user.body.id;

      const name = 'Teste do Update';
      const update = await request(app.instance)
        .put(`/api/v1/users/${userId}`)
        .send(Object.assign(data, { name }));

      const res = await request(app.instance).get(`/api/v1/users/${userId}`);

      expect(update.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0].id).toBe(userId);
      expect(res.body[0].role).toBe(data.role);
      expect(res.body[0].name).toBe(name);
      expect(res.body[0].email).toBe(data.email);
    });

    it('Deve retornar um erro ao atualizar um usuario invalido', async () => {
      const id = 2;

      const data = {
        name: 'Teste do Update invalido',
      };

      const res = await request(app.instance).put(`/api/v1/users/${id}`).send(data);

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toBe('Usuário não cadastrado');
    });
  });

  describe('DELETE /api/v1/users/:id', () => {
    it('Deve deletar um usuario', async () => {
      const data = {
        role: 'guest',
        name: 'Teste',
        email: 'teste@teste.com',
        password: 'teste',
      };

      const user = await request(app.instance).post('/api/v1/users').send(data);
      const userId = user.body.id;

      await request(app.instance)
        .post('/api/v1/users')
        .send(Object.assign(data, { email: 'teste2@teste.com' }));

      await request(app.instance)
        .post('/api/v1/users')
        .send(Object.assign(data, { email: 'teste3@teste.com' }));

      const deleted = await request(app.instance).delete(`/api/v1/users/${userId}`);
      const users = await request(app.instance).get(`/api/v1/users/`);

      expect(deleted.statusCode).toBe(200);
      expect(users.body.length).toBeGreaterThan(1);
    });

    it('Deve retornar um erro ao deletar um usuario invalido', async () => {
      const id = 2;
      const resp = await request(app.instance).delete(`/api/v1/users/${id}`);

      expect(resp.statusCode).toBe(404);
      expect(resp.body).toHaveProperty('error');
      expect(resp.body.error).toBe('Usuário não cadastrado');
    });
  });
});
