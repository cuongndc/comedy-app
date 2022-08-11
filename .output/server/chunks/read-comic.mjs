globalThis.__timing__.logStart('Load chunks/read-comic');import { defineEventHandler, useQuery } from 'h3';
import mongo from './mongo.mjs';
import { c as collections } from './index.mjs';
import 'mongodb';

const readComic = defineEventHandler(async (event) => {
  const { chapter_slug } = useQuery(event);
  const chapter = await client.db().collection(collections.chapters).findOne({
    slug: chapter_slug
  });
  const pages = await client.db().collection(collections.chapterPages).find({
    chapterSlug: chapter_slug
  }).sort({
    pageNum: 1
  }).toArray();
  return {
    chapter,
    pages
  };
});

export { readComic as default };;globalThis.__timing__.logEnd('Load chunks/read-comic');
//# sourceMappingURL=read-comic.mjs.map
