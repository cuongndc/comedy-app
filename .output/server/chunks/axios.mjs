globalThis.__timing__.logStart('Load chunks/axios');import axios from 'axios';

const baseURL = process.env.SERVICE_URL;
const headers = {
  "Content-Type": "application/json",
  "referer": baseURL,
  "origin": baseURL
};
const instance = axios.create({
  baseURL,
  headers,
  withCredentials: false
});
const instance$1 = instance;

export { instance$1 as i };;globalThis.__timing__.logEnd('Load chunks/axios');
//# sourceMappingURL=axios.mjs.map
