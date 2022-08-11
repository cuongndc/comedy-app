globalThis.__timing__.logStart('Load chunks/chapters');import { defineEventHandler, useQuery } from 'h3';
import mongo from './mongo.mjs';
import { c as collections } from './index.mjs';
import 'mongodb';

const chapters = defineEventHandler(async (event) => {
  const { novelId } = useQuery(event);
  return await client.db().collection(collections.novelChapters).find({
    novelId
  }).toArray();
});

export { chapters as default };;globalThis.__timing__.logEnd('Load chunks/chapters');
//# sourceMappingURL=chapters.mjs.map
