globalThis.__timing__.logStart('Load chunks/search');import { defineEventHandler, useQuery } from 'h3';
import mongo from './mongo.mjs';
import { c as collections } from './index.mjs';
import 'mongodb';

const search = defineEventHandler(async (event) => {
  const { q } = useQuery(event);
  return await mongo.db().collection(collections.comics).find({ $text: { $search: q } }).limit(15).toArray();
});

export { search as default };;globalThis.__timing__.logEnd('Load chunks/search');
//# sourceMappingURL=search.mjs.map
