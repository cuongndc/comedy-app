import { useQuery } from 'h3'
import mongo from '~/server/api/mongo'
import { collections } from '~/contants'

export default defineEventHandler(async (event) => {
  const { tags } = useQuery(event)
  return await mongo.db().collection(collections.comics).find({
    'tags.slug': {
      $in: tags,
    },
  }).limit(10).toArray()
})
