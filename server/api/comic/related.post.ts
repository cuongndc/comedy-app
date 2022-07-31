import { useBody } from 'h3'
import mongo from '~/server/api/mongo'
import { collections } from '~/contants'

export default defineEventHandler(async (event) => {
  const body = await useBody(event)
  return await mongo.db().collection(collections.comics).find({
    'tags.slug': {
      $in: body.tags,
    },
  }).limit(15).toArray()
})
