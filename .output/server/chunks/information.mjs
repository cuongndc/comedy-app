globalThis.__timing__.logStart('Load chunks/information');import { defineEventHandler, useQuery } from 'h3';
import mongo from './mongo.mjs';
import { c as collections } from './index.mjs';
import 'mongodb';

const information = defineEventHandler(async (event) => {
  const { novelId } = useQuery(event);
  const chapters = await client.db().collection(collections.novelChapters).find({
    novelId
  }).toArray();
  return {
    chapters
  };
});

export { information as default };;globalThis.__timing__.logEnd('Load chunks/information');
//# sourceMappingURL=information.mjs.map
