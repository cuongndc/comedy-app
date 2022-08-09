import { defineEventHandler, useQuery } from 'h3'
import mongo from '~/server/api/mongo'
import { collections } from '~/contants'

export default defineEventHandler(async (event) => {
  const { slug } = useQuery(event)

  return await mongo.db().collection(collections.novelChapters).findOne({
    slug,
  })
})
