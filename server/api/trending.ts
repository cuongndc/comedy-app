import mongo from '~/server/api/mongo'
import { collections } from '~/contants'

export default defineEventHandler(async () => {
  const slug = [
    'ngon-tinh-co-dai',
    'ngon-tinh-hien-dai',
    'dam-my-bach-hop',
  ]

  return await mongo.db().collection(collections.comics).find({
    'categories.categorySlug': {
      $in: slug,
    },
  }).limit(99).sort({ updatedAt: -1 }).toArray()
})
