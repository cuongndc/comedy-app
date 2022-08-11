import { useBody } from 'h3'
import client from '~/serverless/mongoClient'
import { collections } from '~/contants'

export default defineEventHandler(async (event) => {
  const body = await useBody(event)
  return await client.db().collection(collections.novels).find({
    'tags.slug': {
      $in: body.tags,
    },
  }).limit(15).toArray()
})
