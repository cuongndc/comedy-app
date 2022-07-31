import mongo from '~/server/api/mongo'
import { collections } from '~/contants'

export default defineEventHandler(async (event) => {
  const slug = event.context.params.slug
  return await mongo.db().collection(collections.comics).find({
    'tags.slug': slug,
  }).limit(25).sort({ updatedAt: -1 }).toArray()
})
