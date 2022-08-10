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
  return await mongo.db().collection(collections.novels).find(filter).limit(30).sort({ updatedAt: -1 }).toArray()
})
