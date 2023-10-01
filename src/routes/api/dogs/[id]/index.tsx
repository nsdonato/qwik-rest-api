import type { RequestHandler } from '@builder.io/qwik-city'
import dogs from '../data.json'

export const onGet: RequestHandler = ({ json, params }) => {
  const dog = dogs.find((doggy) => doggy.id === Number(params.id))

  if (!dog) json(400, {})
  else json(200, dog)
}

export const onPut: RequestHandler = async ({ request, params, json }) => {
  const dog = dogs.find((doggy) => doggy.id === Number(params.id))

  if (!dog) json(400, {})
  else {
    const req = await request.json()
    dog.name = req.name
    dog.age = req.age
    json(200, dog)
  }
}

export const onDelete: RequestHandler = ({ params, json }) => {
  const dog = dogs.find((doggy) => doggy.id === Number(params.id))

  if (!dog) {
    json(400, {})
  } else {
    const index = dogs.indexOf(dog)
    dogs.splice(index, 1)
    json(200, dogs)
  }
}
