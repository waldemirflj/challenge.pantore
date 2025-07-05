import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { execSync } from 'child_process';

const name = process.argv[2];

if (!name) {
  console.error(
    ' Você precisa informar o nome da migration. \n Ex: npm run migration:generate GenerateTableUsers',
  );

  process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const output = join(__dirname, `../src/migrations/${name}`);
const command = `node --loader ts-node/esm --experimental-specifier-resolution=node ./node_modules/typeorm/cli.js --dataSource ./src/config/datasource.ts migration:generate ${output}`;

execSync(command, {
  stdio: 'inherit',
});
