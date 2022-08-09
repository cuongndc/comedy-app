globalThis.__timing__.logStart('Load chunks/_slug_2');import { defineEventHandler } from 'h3';
import mongo from './mongo.mjs';
import { c as collections } from './index.mjs';
import 'mongodb';

const _slug_ = defineEventHandler(async (event) => {
  const params = event.context.params;
  const { slug } = params;
  return await mongo.db().collection(collections.novels).findOne({
    slug
  });
});

export { _slug_ as default };;globalThis.__timing__.logEnd('Load chunks/_slug_2');
//# sourceMappingURL=_slug_2.mjs.map
