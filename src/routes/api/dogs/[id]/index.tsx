import type { RequestHandler } from '@builder.io/qwik-city';
import { readBdFile, writeBdFile } from '~/utils/file';

export const onGet: RequestHandler = async ({ json, params }) => {
  const dogs = await readBdFile();

  const dog = dogs.find((doggy) => doggy.id === Number(params.id));

  if (!dog) json(400, {});
  else json(200, dog);
};

export const onPut: RequestHandler = async ({ request, params, json }) => {
  const dogs = await readBdFile();
  const dog = dogs.find((doggy) => doggy.id === Number(params.id));

  if (!dog) json(400, {});
  else {
    const req = await request.json();
    dog.name = req.name;
    dog.age = req.age;

    await writeBdFile(dogs);
    json(200, dog);
  }
};

export const onDelete: RequestHandler = async ({ params, json }) => {
  const dogs = await readBdFile();

  const dog = dogs.find((doggy) => doggy.id === Number(params.id));

  if (!dog) {
    json(400, {});
  } else {
    const index = dogs.indexOf(dog);
    dogs.splice(index, 1);

    await writeBdFile(dogs);
    json(200, dogs);
  }
};
