globalThis.__timing__.logStart('Load chunks/information');import { defineEventHandler, useQuery } from 'h3';
import mongo from './mongo.mjs';
import { c as collections } from './index.mjs';
import 'mongodb';

const information = defineEventHandler(async (event) => {
  const { novelId } = useQuery(event);
  const chapters = await mongo.db().collection(collections.novelChapters).find({
    novelId
  }).toArray();
  const novel = await mongo.db().collection(collections.novels).findOne({
    _id: novelId
  });
  return {
    chapters,
    novel
  };
});

export { information as default };;globalThis.__timing__.logEnd('Load chunks/information');
//# sourceMappingURL=information.mjs.map
