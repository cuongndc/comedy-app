globalThis.__timing__.logStart('Load chunks/chapters');import { defineEventHandler, useQuery } from 'h3';
import mongo from './mongo.mjs';
import { c as collections } from './index.mjs';
import 'mongodb';

const chapters = defineEventHandler(async (event) => {
  const { comic_slug } = useQuery(event);
  return await mongo.db().collection(collections.chapters).find({
    comicSlug: comic_slug
  }).sort({
    chapterOrderIndex: 1
  }).toArray();
});

export { chapters as default };;globalThis.__timing__.logEnd('Load chunks/chapters');
//# sourceMappingURL=chapters.mjs.map
