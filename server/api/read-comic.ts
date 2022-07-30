import { defineEventHandler, useQuery } from 'h3'
import mongo from '~/server/api/mongo'
import { collections } from '~/contants'

export default defineEventHandler(async (event) => {
  const { chapter_slug } = useQuery(event)

  const chapter = await mongo.db().collection(collections.chapters).findOne({
    slug: chapter_slug,
  })

  const pages = await mongo.db().collection(collections.chapterPages).find({
    chapterSlug: chapter_slug,
  }).sort({
    pageNum: 1,
  }).toArray()

  return {
    chapter,
    pages,
  }
})
