globalThis.__timing__.logStart('Load chunks/homepage');import { defineEventHandler } from 'h3';
import { i as instance } from './axios.mjs';
import 'axios';

const homepage = defineEventHandler(async () => {
  return instance.get("/api/wb/homepage").then((res) => res.data);
});

export { homepage as default };;globalThis.__timing__.logEnd('Load chunks/homepage');
//# sourceMappingURL=homepage.mjs.map
