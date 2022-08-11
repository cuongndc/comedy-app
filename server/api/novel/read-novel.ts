import { defineEventHandler, useQuery } from 'h3'
import client from '~/serverless/mongoClient'
import { collections } from '~/contants'

export default defineEventHandler(async (event) => {
  const { slug } = useQuery(event)

  const chapter = await client.db().collection(collections.novelChapters).findOne({
    slug,
  })

  const novel = await client.db().collection(collections.novels).findOne({
    _id: chapter.novelId,
  })

  return {
    chapter,
    novel,
  }
})
