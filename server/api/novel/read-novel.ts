import { defineEventHandler, useQuery } from 'h3'
import mongo from '~/server/api/mongo'
import { collections } from '~/contants'

export default defineEventHandler(async (event) => {
  const { slug } = useQuery(event)

  const chapter = await mongo.db().collection(collections.novelChapters).findOne({
    slug,
  })

  const novel = await mongo.db().collection(collections.novels).findOne({
    _id: chapter.novelId,
  })

  return {
    chapter,
    novel,
  }
})
