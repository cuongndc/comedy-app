globalThis.__timing__.logStart('Load chunks/read-novel');import { defineEventHandler, useQuery } from 'h3';
import mongo from './mongo.mjs';
import { c as collections } from './index.mjs';
import 'mongodb';

const readNovel = defineEventHandler(async (event) => {
  const { slug } = useQuery(event);
  return await mongo.db().collection(collections.novelChapters).findOne({
    slug
  });
});

export { readNovel as default };;globalThis.__timing__.logEnd('Load chunks/read-novel');
//# sourceMappingURL=read-novel.mjs.map
