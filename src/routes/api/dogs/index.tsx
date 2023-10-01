import type { RequestHandler } from '@builder.io/qwik-city';
import { readBdFile, writeBdFile } from '~/utils/file';

export const onGet: RequestHandler = async ({ json }) => {
  try {
    const dogs = await readBdFile();
    json(200, dogs);
  } catch (error) {
    json(500, error);
  }
};

export const onPost: RequestHandler = async ({ request, json }) => {
  const req = await request.json();

  const dogs = await readBdFile();

  const newId = dogs.reduce((acc, curr) => {
    acc = curr.id;
    acc++;
    return acc;
  }, 1);

  const newDog = {
    id: newId,
    name: req.name,
    age: req.age,
  };

  dogs.push(newDog);

  try {
    await writeBdFile(dogs);
    json(200, newDog);
  } catch (err) {
    json(500, err);
  }
};

export const onDelete: RequestHandler = async ({ json }) => {
  try {
    const dogs = await readBdFile();

    dogs.splice(0, dogs.length);

    await writeBdFile(dogs);

    json(200, dogs);
  } catch (error) {
    json(500, error);
  }
};
