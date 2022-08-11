globalThis.__timing__.logStart('Load chunks/read-novel');import { defineEventHandler, useQuery } from 'h3';
import { c as client, a as collections } from './index.mjs';
import 'mongodb';

const readNovel = defineEventHandler(async (event) => {
  const { slug } = useQuery(event);
  const chapter = await client.db().collection(collections.novelChapters).findOne({
    slug
  });
  const novel = await client.db().collection(collections.novels).findOne({
    _id: chapter.novelId
  });
  return {
    chapter,
    novel
  };
});

export { readNovel as default };;globalThis.__timing__.logEnd('Load chunks/read-novel');
//# sourceMappingURL=read-novel.mjs.map
