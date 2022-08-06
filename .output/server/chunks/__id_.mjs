globalThis.__timing__.logStart('Load chunks/__id_');import { defineEventHandler } from 'h3';
import mongo from './mongo.mjs';
import { c as collections } from './index.mjs';
import 'mongodb';

const __id_ = defineEventHandler(async (event) => {
  const params = event.context.params;
  const { slug } = params;
  return await mongo.db().collection(collections.comics).findOne({
    slug
  });
});

export { __id_ as default };;globalThis.__timing__.logEnd('Load chunks/__id_');
//# sourceMappingURL=__id_.mjs.map
