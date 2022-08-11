globalThis.__timing__.logStart('Load chunks/home-novel');import { defineEventHandler } from 'h3';
import { i as instance } from './axios.mjs';
import 'axios';

const homeNovel = defineEventHandler(async () => {
  return instance.get("/api/wb/home-novel").then((res) => res.data);
});

export { homeNovel as default };;globalThis.__timing__.logEnd('Load chunks/home-novel');
//# sourceMappingURL=home-novel.mjs.map
