globalThis.__timing__.logStart('Load chunks/__id_');import { defineEventHandler } from 'h3';
import { c as client, a as collections } from './index.mjs';
import 'mongodb';

const __id_ = defineEventHandler(async (event) => {
  console.log("client", client);
  const params = event.context.params;
  const { slug } = params;
  return await client.db().collection(collections.comics).findOne({
    slug
  });
});

export { __id_ as default };;globalThis.__timing__.logEnd('Load chunks/__id_');
//# sourceMappingURL=__id_.mjs.map
