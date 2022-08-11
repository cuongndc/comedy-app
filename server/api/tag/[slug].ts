import client from '~/serverless/mongoClient'
import { collections } from '~/contants'

export default defineEventHandler(async (event) => {
  const slug = event.context.params.slug
  return await client.db().collection(collections.comics).find({
    'tags.slug': slug,
  }).limit(25).sort({ updatedAt: -1 }).toArray()
})
