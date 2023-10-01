import { readFile, writeFile } from 'node:fs/promises';

const BD_FILE = './dogs.json';

export const readBdFile = async () => {
  const data = await readFile(BD_FILE, 'utf8');
  const dogs = JSON.parse(data);
  return dogs;
};

export const writeBdFile = async (dogs) => {
  const data = JSON.stringify(dogs, null, 2);
  await writeFile(BD_FILE, data);
};
