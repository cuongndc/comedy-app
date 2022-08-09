import mongo from '~/server/api/mongo'
import { collections } from '~/contants'

export default defineEventHandler(async (event) => {
  const params = event.context.params
  const { slug } = params

  return await mongo.db().collection(collections.novels).findOne({
    slug,
  })
})
