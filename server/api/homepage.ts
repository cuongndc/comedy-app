import mongo from '~/server/api/mongo'
import { collections } from '~/contants'

export default defineEventHandler(async () => {
  const pages = await mongo.db().collection(collections.homePages).find({}).sort({
    orderIndex: 1,
  }).limit(10).toArray()

  return pages
})
