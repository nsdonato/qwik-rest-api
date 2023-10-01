import type { RequestHandler } from '@builder.io/qwik-city'
import dogs from './data.json'

export const onGet: RequestHandler = ({ json }) => {
  json(200, dogs)
}

export const onPost: RequestHandler = async ({ request, json }) => {
  const req = await request.json()

  const newId = dogs.reduce((acc, curr) => {
    acc = curr.id
    acc++
    return acc
  }, 0)

  const newDog = {
    id: newId,
    name: req.name,
    age: req.age
  }

  dogs.push(newDog)

  json(200, newDog)
}

export const onDelete: RequestHandler = ({ json }) => {
  dogs.splice(0, dogs.length)
  json(200, dogs)
}
