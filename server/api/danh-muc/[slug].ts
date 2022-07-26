import mongo from '~/server/api/mongo'
import { collections } from '~/contants'

export default defineEventHandler(async (event) => {
  const slug = event.context.params.slug
  let filter = {}

  if (slug !== 'all') {
    filter = {
      'categories.categorySlug': {
        $in: [slug],
      },
    }
  }
  return await mongo.db().collection(collections.comics).find(filter).limit(15).sort({ updatedAt: -1 }).toArray()
})
