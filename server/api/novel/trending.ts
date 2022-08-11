import client from '~/serverless/mongoClient'
import { collections } from '~/contants'

export default defineEventHandler(async () => {
  const slug = [
    'ngon-tinh-co-dai',
    'ngon-tinh-hien-dai',
    'dam-my-bach-hop',
    'cuoc-thi-viet-truyen-ngan',
    'lang-man-ngot-ngao',
    'tinh-yeu-dau-doi',
    'linh-dai-trinh-tham',
  ]

  return await client.db().collection(collections.novels).find({
    'categories.categorySlug': {
      $in: slug,
    },
  }).limit(99).sort({ viewCount: -1 }).toArray()
})
