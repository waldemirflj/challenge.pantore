import { join } from 'path';
import { execSync } from 'child_process';

const name = process.argv[2];

if (!name) {
  console.error(
    ' Você precisa informar o nome da migration. \n Ex: npm run migration:generate CreateTableUsers',
  );

  process.exit(1);
}

const output = join(__dirname, `../src/migrations/${name}`);
const command = `ts-node ./node_modules/typeorm/cli.js migration:create ${output}`;

execSync(command, {
  stdio: 'inherit',
});
