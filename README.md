# challenge.pantore

> Projeto desenvolvido como parte do processo seletivo para a vaga de [Desenvolvedor Backend](https://github.com/Pantore/developer-test/blob/main/BACKEND.md) na Pantore.

### Desenvolvimento sem Docker

```bash
# No diretório raiz do projeto, siga as instruções a seguir.
$ docker compose up database
$ npm install
$ npm run migration:run
$ npm run dev

# Caso queira testar a aplicação, siga as instruções a seguir.
# * Certifique-se de que o container do banco de dados esteja em execução.
$ npm test
```

### Desenvolvimento com Docker

```bash
# Caso deseje testar a aplicação utilizando um container, siga as instruções a seguir.
$ docker compose run --rm test

# Caso deseje executar a aplicação em modo de produção ou desenvolvimento utilizando um container, siga as instruções a seguir.
$ docker compose up database production
$ docker compose up database development

# Para encerrar e remover os containers, siga as instruções a seguir.
$ docker compose down -v
```

**Obs.: No diretório raiz do projeto, você encontrará uma coleção do Postman com os endpoints disponíveis para facilitar o teste da aplicação.**

### Estrutura do Projeto

```
├── challenge.pantore.postman_collection.json
├── docker-compose.yml
├── Dockerfile
├── eslint.config.js
├── jest.config.ts
├── package.json
├── package-lock.json
├── README.md
├── scripts
│   ├── migration-create.ts
│   └── migration-generate.ts
├── src
│   ├── common
│   │   └── encrypt.ts
│   ├── config
│   │   ├── datasource.test-config.ts
│   │   └── datasource.ts
│   ├── errors
│   │   ├── appError.ts
│   │   ├── badRequestError.ts
│   │   ├── index.ts
│   │   └── notFoundError.ts
│   ├── express.ts
│   ├── migrations
│   │   └── 1751383559894-generate-users.ts
│   ├── modules
│   │   ├── healthcheck
│   │   │   ├── healthcheck.routes.ts
│   │   │   └── __tests__
│   │   │       └── healthcheck.test.ts
│   │   ├── index.ts
│   │   └── users
│   │       ├── dto
│   │       │   └── user.dto.ts
│   │       ├── enum
│   │       │   └── role.enum.ts
│   │       ├── __tests__
│   │       │   └── user.test.ts
│   │       ├── user.controller.ts
│   │       ├── user.entity.ts
│   │       ├── user.repository.ts
│   │       ├── user.routes.ts
│   │       └── user.service.ts
│   ├── routes.ts
│   └── server.ts
└── tsconfig.json
```

### Dependências & Tecnologias

- [MySQL](https://www.mysql.com/)
- [TypeORM](https://typeorm.io/)
- [Docker & Docker compose](https://docs.docker.com/engine/)
- [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm)
  - Dependências
    - bcrypt
    - better-sqlite3
    - class-transformer
    - cors
    - dotenv
    - bcrypt
    - express
    - mysql2
    - reflect-metadata
    - typeorm
