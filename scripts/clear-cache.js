/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { rmSync, existsSync } = require('fs');
const { join } = require('path');

const path = join(__dirname, '..', 'node_modules', '.cache');

if (existsSync(path)) {
  rmSync(path, { recursive: true, force: true });
  console.log('Папка "node_modules/.cache" удалена');
} else {
  console.log('Папки "node_modules/.cache" не существует');
}
