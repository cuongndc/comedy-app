globalThis.__timing__.logStart('Load chunks/read-novel');import { defineEventHandler, useQuery } from 'h3';
import mongo from './mongo.mjs';
import { c as collections } from './index.mjs';
import 'mongodb';

const readNovel = defineEventHandler(async (event) => {
  const { slug } = useQuery(event);
  const chapter = await mongo.db().collection(collections.novelChapters).findOne({
    slug
  });
  const novel = await mongo.db().collection(collections.novels).findOne({
    _id: chapter.novelId
  });
  return {
    chapter,
    novel
  };
});

export { readNovel as default };;globalThis.__timing__.logEnd('Load chunks/read-novel');
//# sourceMappingURL=read-novel.mjs.map
