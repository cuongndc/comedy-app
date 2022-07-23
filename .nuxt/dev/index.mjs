globalThis._importMeta_={url:import.meta.url,env:process.env};import 'file:///Users/bonn/Documents/GitHub/comedy-app/node_modules/node-fetch-native/dist/polyfill.mjs';
import { Server } from 'http';
import { tmpdir } from 'os';
import { join } from 'path';
import { mkdirSync } from 'fs';
import { parentPort, threadId } from 'worker_threads';
import { provider, isWindows } from 'file:///Users/bonn/Documents/GitHub/comedy-app/node_modules/std-env/dist/index.mjs';
import { defineEventHandler, handleCacheHeaders, createEvent, createApp, createRouter, lazyEventHandler, useQuery, eventHandler } from 'file:///Users/bonn/Documents/GitHub/comedy-app/node_modules/h3/dist/index.mjs';
import { createFetch as createFetch$1, Headers } from 'file:///Users/bonn/Documents/GitHub/comedy-app/node_modules/ohmyfetch/dist/node.mjs';
import destr from 'file:///Users/bonn/Documents/GitHub/comedy-app/node_modules/destr/dist/index.mjs';
import { createRouter as createRouter$1 } from 'file:///Users/bonn/Documents/GitHub/comedy-app/node_modules/radix3/dist/index.mjs';
import { createCall, createFetch } from 'file:///Users/bonn/Documents/GitHub/comedy-app/node_modules/unenv/runtime/fetch/index.mjs';
import { createHooks } from 'file:///Users/bonn/Documents/GitHub/comedy-app/node_modules/hookable/dist/index.mjs';
import { hash } from 'file:///Users/bonn/Documents/GitHub/comedy-app/node_modules/ohash/dist/index.mjs';
import { parseURL, withQuery, joinURL } from 'file:///Users/bonn/Documents/GitHub/comedy-app/node_modules/ufo/dist/index.mjs';
import { createStorage } from 'file:///Users/bonn/Documents/GitHub/comedy-app/node_modules/unstorage/dist/index.mjs';
import _unstorage_drivers_fs from 'file:///Users/bonn/Documents/GitHub/comedy-app/node_modules/unstorage/dist/drivers/fs.mjs';
import axios from 'file:///Users/bonn/Documents/GitHub/comedy-app/node_modules/axios/index.js';
import { reactive } from 'file:///Users/bonn/Documents/GitHub/comedy-app/node_modules/vue/dist/vue.cjs.js';
import queryString from 'file:///Users/bonn/Documents/GitHub/comedy-app/node_modules/query-string/index.js';
import { createRenderer } from 'file:///Users/bonn/Documents/GitHub/comedy-app/node_modules/vue-bundle-renderer/dist/index.mjs';
import devalue from 'file:///Users/bonn/Documents/GitHub/comedy-app/node_modules/@nuxt/devalue/dist/devalue.mjs';
import { renderToString } from 'file:///Users/bonn/Documents/GitHub/comedy-app/node_modules/vue/server-renderer/index.mjs';
import { snakeCase } from 'file:///Users/bonn/Documents/GitHub/comedy-app/node_modules/scule/dist/index.mjs';
import htmlTemplate from '/Users/bonn/Documents/GitHub/comedy-app/.nuxt/views/document.template.mjs';

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"routes":{},"envPrefix":"NUXT_"},"public":{"NUXT_PUBLIC_SERVICE_URL":"https://truyenmem.herokuapp.com","DOMAIN":"meetruyen.com","SIZE_NAME":"MeeTruyen"}};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const getEnv = (key) => {
  const envKey = snakeCase(key).toUpperCase();
  return destr(process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]);
};
function isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function overrideConfig(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey);
    if (isObject(obj[key])) {
      if (isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      overrideConfig(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
}
overrideConfig(_runtimeConfig);
const config$1 = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => config$1;
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

const globalTiming = globalThis.__timing__ || {
  start: () => 0,
  end: () => 0,
  metrics: []
};
function timingMiddleware(_req, res, next) {
  const start = globalTiming.start();
  const _end = res.end;
  res.end = (data, encoding, callback) => {
    const metrics = [["Generate", globalTiming.end(start)], ...globalTiming.metrics];
    const serverTiming = metrics.map((m) => `-;dur=${m[1]};desc="${encodeURIComponent(m[0])}"`).join(", ");
    if (!res.headersSent) {
      res.setHeader("Server-Timing", serverTiming);
    }
    _end.call(res, data, encoding, callback);
  };
  next();
}

const serverAssets = [{"baseName":"server","dir":"/Users/bonn/Documents/GitHub/comedy-app/server/assets"}];

const assets = createStorage();

for (const asset of serverAssets) {
  assets.mount(asset.baseName, _unstorage_drivers_fs({ base: asset.dir }));
}

const storage = createStorage({});

const useStorage = () => storage;

storage.mount('/assets', assets);

storage.mount('root', _unstorage_drivers_fs({"driver":"fs","base":"/Users/bonn/Documents/GitHub/comedy-app","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('src', _unstorage_drivers_fs({"driver":"fs","base":"/Users/bonn/Documents/GitHub/comedy-app/server","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('build', _unstorage_drivers_fs({"driver":"fs","base":"/Users/bonn/Documents/GitHub/comedy-app/.nuxt","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('cache', _unstorage_drivers_fs({"driver":"fs","base":"/Users/bonn/Documents/GitHub/comedy-app/.nuxt/cache","ignore":["**/node_modules/**","**/.git/**"]}));

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  async function get(key, resolver) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl;
    const _resolve = async () => {
      if (!pending[key]) {
        entry.value = void 0;
        entry.integrity = void 0;
        entry.mtime = void 0;
        entry.expires = void 0;
        pending[key] = Promise.resolve(resolver());
      }
      entry.value = await pending[key];
      entry.mtime = Date.now();
      entry.integrity = integrity;
      delete pending[key];
      useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return Promise.resolve(entry);
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const key = (opts.getKey || getKey)(...args);
    const entry = await get(key, () => fn(...args));
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length ? hash(args, {}) : "";
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: (event) => {
      return decodeURI(parseURL(event.req.originalUrl || event.req.url).pathname).replace(/\/$/, "/index");
    },
    group: opts.group || "nitro/handlers",
    integrity: [
      opts.integrity,
      handler
    ]
  };
  const _cachedHandler = cachedFunction(async (incomingEvent) => {
    const reqProxy = cloneWithProxy(incomingEvent.req, { headers: {} });
    const resHeaders = {};
    const resProxy = cloneWithProxy(incomingEvent.res, {
      statusCode: 200,
      getHeader(name) {
        return resHeaders[name];
      },
      setHeader(name, value) {
        resHeaders[name] = value;
        return this;
      },
      getHeaderNames() {
        return Object.keys(resHeaders);
      },
      hasHeader(name) {
        return name in resHeaders;
      },
      removeHeader(name) {
        delete resHeaders[name];
      },
      getHeaders() {
        return resHeaders;
      }
    });
    const event = createEvent(reqProxy, resProxy);
    event.context = incomingEvent.context;
    const body = await handler(event);
    const headers = event.res.getHeaders();
    headers.Etag = `W/"${hash(body)}"`;
    headers["Last-Modified"] = new Date().toUTCString();
    const cacheControl = [];
    if (opts.swr) {
      if (opts.maxAge) {
        cacheControl.push(`s-maxage=${opts.maxAge}`);
      }
      if (opts.staleMaxAge) {
        cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
      } else {
        cacheControl.push("stale-while-revalidate");
      }
    } else if (opts.maxAge) {
      cacheControl.push(`max-age=${opts.maxAge}`);
    }
    if (cacheControl.length) {
      headers["Cache-Control"] = cacheControl.join(", ");
    }
    const cacheEntry = {
      code: event.res.statusCode,
      headers,
      body
    };
    return cacheEntry;
  }, _opts);
  return defineEventHandler(async (event) => {
    const response = await _cachedHandler(event);
    if (event.res.headersSent || event.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["Last-Modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.res.statusCode = response.code;
    for (const name in response.headers) {
      event.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const plugins = [
  
];

function hasReqHeader(req, header, includes) {
  const value = req.headers[header];
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event.req, "accept", "application/json") || hasReqHeader(event.req, "user-agent", "curl/") || hasReqHeader(event.req, "user-agent", "httpie/") || event.req.url?.endsWith(".json") || event.req.url?.includes("/api/");
}
function normalizeError(error) {
  const cwd = process.cwd();
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Route Not Found" : "Internal Server Error");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(_error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(_error);
  const errorObject = {
    url: event.req.url,
    statusCode,
    statusMessage,
    message,
    description: statusCode !== 404 ? `<pre>${stack.map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n")}</pre>` : "",
    data: _error.data
  };
  event.res.statusCode = errorObject.statusCode;
  event.res.statusMessage = errorObject.statusMessage;
  if (errorObject.statusCode !== 404) {
    console.error("[nuxt] [request error]", errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    event.res.setHeader("Content-Type", "application/json");
    event.res.end(JSON.stringify(errorObject));
    return;
  }
  const url = withQuery("/__nuxt_error", errorObject);
  const html = await $fetch(url).catch((error) => {
    console.error("[nitro] Error while generating error response", error);
    return errorObject.statusMessage;
  });
  event.res.setHeader("Content-Type", "text/html;charset=UTF-8");
  event.res.end(html);
});

const _lazy_xuZyBF = () => Promise.resolve().then(function () { return xuyenKhong$1; });
const _lazy_NDIXrt = () => Promise.resolve().then(function () { return topWeek$1; });
const _lazy_Vo5ccO = () => Promise.resolve().then(function () { return topMonth$1; });
const _lazy_5G9uvj = () => Promise.resolve().then(function () { return topDay$1; });
const _lazy_oblgUA = () => Promise.resolve().then(function () { return topAll$1; });
const _lazy_WPdDbz = () => Promise.resolve().then(function () { return spotlights$1; });
const _lazy_RWiDAZ = () => Promise.resolve().then(function () { return search$1; });
const _lazy_VysmTO = () => Promise.resolve().then(function () { return searchManga$1; });
const _lazy_jUuToP = () => Promise.resolve().then(function () { return recommendStory$1; });
const _lazy_0dIlh1 = () => Promise.resolve().then(function () { return proxy$1; });
const _lazy_aMS54Z = () => Promise.resolve().then(function () { return ngonTinh$1; });
const _lazy_xas3jJ = () => Promise.resolve().then(function () { return mangaUpdated$1; });
const _lazy_1P077p = () => Promise.resolve().then(function () { return mangaNew$1; });
const _lazy_5thFEk = () => Promise.resolve().then(function () { return followStory$1; });
const _lazy_kjjyn5 = () => Promise.resolve().then(function () { return filter$1; });
const _lazy_nAbYNo = () => Promise.resolve().then(function () { return damMy$1; });
const _lazy_FHWlHW = () => Promise.resolve().then(function () { return comic$1; });
const _lazy_t0w8lA = () => Promise.resolve().then(function () { return chapters$1; });
const _lazy_b1GDrx = () => Promise.resolve().then(function () { return renderer$1; });

const handlers = [
  { route: '/api/xuyen-khong', handler: _lazy_xuZyBF, lazy: true, middleware: false, method: undefined },
  { route: '/api/top-week', handler: _lazy_NDIXrt, lazy: true, middleware: false, method: undefined },
  { route: '/api/top-month', handler: _lazy_Vo5ccO, lazy: true, middleware: false, method: undefined },
  { route: '/api/top-day', handler: _lazy_5G9uvj, lazy: true, middleware: false, method: undefined },
  { route: '/api/top-all', handler: _lazy_oblgUA, lazy: true, middleware: false, method: undefined },
  { route: '/api/spotlights', handler: _lazy_WPdDbz, lazy: true, middleware: false, method: undefined },
  { route: '/api/search', handler: _lazy_RWiDAZ, lazy: true, middleware: false, method: undefined },
  { route: '/api/search-manga', handler: _lazy_VysmTO, lazy: true, middleware: false, method: undefined },
  { route: '/api/recommend-story', handler: _lazy_jUuToP, lazy: true, middleware: false, method: undefined },
  { route: '/api/proxy', handler: _lazy_0dIlh1, lazy: true, middleware: false, method: undefined },
  { route: '/api/ngon-tinh', handler: _lazy_aMS54Z, lazy: true, middleware: false, method: undefined },
  { route: '/api/manga-updated', handler: _lazy_xas3jJ, lazy: true, middleware: false, method: undefined },
  { route: '/api/manga-new', handler: _lazy_1P077p, lazy: true, middleware: false, method: undefined },
  { route: '/api/follow-story', handler: _lazy_5thFEk, lazy: true, middleware: false, method: undefined },
  { route: '/api/filter', handler: _lazy_kjjyn5, lazy: true, middleware: false, method: undefined },
  { route: '/api/dam-my', handler: _lazy_nAbYNo, lazy: true, middleware: false, method: undefined },
  { route: '/api/comic', handler: _lazy_FHWlHW, lazy: true, middleware: false, method: undefined },
  { route: '/api/chapters', handler: _lazy_t0w8lA, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_b1GDrx, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_b1GDrx, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(true),
    onError: errorHandler
  });
  h3App.use(config.app.baseURL, timingMiddleware);
  const router = createRouter();
  const routerOptions = createRouter$1({ routes: config.nitro.routes });
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    const referenceRoute = h.route.replace(/:\w+|\*\*/g, "_");
    const routeOptions = routerOptions.lookup(referenceRoute) || {};
    if (routeOptions.swr) {
      handler = cachedEventHandler(handler, {
        group: "nitro/routes"
      });
    }
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(/\/+/g, "/");
      h3App.use(middlewareBase, handler);
    } else {
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const localCall = createCall(h3App.nodeHandler);
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({ fetch: localFetch, Headers, defaults: { baseURL: config.app.baseURL } });
  globalThis.$fetch = $fetch;
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();

const server = new Server(nitroApp.h3App.nodeHandler);
function getAddress() {
  if (provider === "stackblitz" || process.env.NITRO_NO_UNIX_SOCKET) {
    return "0";
  }
  const socketName = `worker-${process.pid}-${threadId}.sock`;
  if (isWindows) {
    return join("\\\\.\\pipe\\nitro", socketName);
  } else {
    const socketDir = join(tmpdir(), "nitro");
    mkdirSync(socketDir, { recursive: true });
    return join(socketDir, socketName);
  }
}
const listenAddress = getAddress();
server.listen(listenAddress, () => {
  const _address = server.address();
  parentPort.postMessage({
    event: "listen",
    address: typeof _address === "string" ? { socketPath: _address } : { host: "localhost", port: _address.port }
  });
});
{
  process.on("unhandledRejection", (err) => console.error("[nitro] [dev] [unhandledRejection]", err));
  process.on("uncaughtException", (err) => console.error("[nitro] [dev] [uncaughtException]", err));
}

const config = useRuntimeConfig();
const baseURL = config.public.NUXT_PUBLIC_SERVICE_URL + "/api";
const Client = axios.create({
  baseURL,
  headers: {
    "content-type": "application/json"
  },
  paramsSerializer: (params) => queryString.stringify(params)
});
const client = Client;

const SOURCE_PREFIX = "nt";
const netTruyenAPI = {
  advancedSearch: (req) => {
    return client.get(`${SOURCE_PREFIX}/advanced-search`, {
      params: req
    });
  },
  filter: (req) => {
    return client.get(`${SOURCE_PREFIX}/filters`, {
      params: {
        page: req.page ? req.page : void 0,
        genres: req.genres ? req.genres : void 0,
        sort: req.sort ? req.sort : void 0,
        status: req.status ? req.status : void 0,
        limit: req.limit ? req.limit : void 0
      }
    });
  },
  search: async (mangaTitle) => {
    return client.get(`${SOURCE_PREFIX}/search`, {
      params: { q: mangaTitle }
    });
  },
  getManga: (slug) => {
    return client.get(`${SOURCE_PREFIX}/manga/${slug}`);
  },
  getChapters(req) {
    const url = `${SOURCE_PREFIX}/chapter/${req.slug}/${req.chapter}/${req.id}`;
    return client.get(url);
  },
  getNewMangaUpdated(page) {
    return client.get(`${SOURCE_PREFIX}/new-updated`, {
      params: { page: page ? page : void 0 }
    });
  },
  getNewManga(page, genres) {
    return client.get(`${SOURCE_PREFIX}/new`, {
      params: {
        page: page ? page : void 0,
        genres: genres ? genres : void 0
      }
    });
  },
  getMangaRanking(req) {
    return client.get(`${SOURCE_PREFIX}/ranking`, {
      params: {
        page: req.page ? req.page : void 0,
        top: req.top ? req.top : void 0,
        status: req.status ? req.status : void 0,
        genres: req.genre ? req.genre : void 0
      }
    });
  }
};
const NetTruyenRepository = netTruyenAPI;

const NET_TRUYEN = "nettruyen";
function repositoryFactory(name) {
  switch (name) {
    case NET_TRUYEN:
      return NetTruyenRepository;
    default:
      return null;
  }
}

const xuyenKhong = defineEventHandler(async () => {
  const API = repositoryFactory(NET_TRUYEN);
  const filterRequest = {
    genres: "chuyen-sinh-2130",
    page: 1,
    sort: "month",
    limit: 16
  };
  const mangas = await (API == null ? void 0 : API.filter(filterRequest));
  if (mangas.status !== 200)
    return [];
  return mangas == null ? void 0 : mangas.data.data;
});

const xuyenKhong$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': xuyenKhong
});

const topWeek = defineEventHandler(async () => {
  const API = repositoryFactory(NET_TRUYEN);
  const filterRequest = {
    page: 1,
    sort: "week",
    status: "all",
    limit: 6
  };
  const mangas = await (API == null ? void 0 : API.filter(filterRequest));
  if (mangas.status !== 200)
    return [];
  return mangas == null ? void 0 : mangas.data.data;
});

const topWeek$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': topWeek
});

const topMonth = defineEventHandler(async () => {
  const API = repositoryFactory(NET_TRUYEN);
  const filterRequest = {
    page: 1,
    sort: "month",
    status: "all",
    limit: 16
  };
  const mangas = await (API == null ? void 0 : API.filter(filterRequest));
  if (mangas.status !== 200)
    return [];
  return mangas == null ? void 0 : mangas.data.data;
});

const topMonth$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': topMonth
});

const topDay = defineEventHandler(async () => {
  const API = repositoryFactory(NET_TRUYEN);
  const filterRequest = {
    page: 1,
    sort: "day",
    status: "all",
    limit: 6
  };
  const mangas = await (API == null ? void 0 : API.filter(filterRequest));
  if (mangas.status !== 200)
    return [];
  return mangas == null ? void 0 : mangas.data.data;
});

const topDay$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': topDay
});

const topAll = defineEventHandler(async (event) => {
  const NET_TRUYEN_API = repositoryFactory(NET_TRUYEN);
  const rankingAllRequest = {
    status: void 0,
    top: "all",
    page: 3,
    genre: "manhua"
  };
  const mangas = await (NET_TRUYEN_API == null ? void 0 : NET_TRUYEN_API.getMangaRanking(rankingAllRequest));
  if (mangas.status !== 200)
    return [];
  return mangas == null ? void 0 : mangas.data.data;
});

const topAll$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': topAll
});

const spotlights = defineEventHandler(async (event) => {
  return [
    {
      id: 1,
      name: "L\xE3o \u0110\u1EA1i Xuy\xEAn Kh\xF4ng G\u1EA3 Cho Phu Qu\xE2n M\xF9",
      thumbnail: "/images/spotlight-7.png",
      slug: "lao-dai-xuyen-khong-ga-cho-phu-quan-mu-62908",
      updatedAt: "[C\u1EADp nh\u1EADt l\xFAc: 14:43 19/07/2022]",
      view: "795.422",
      author: "\u0110ang c\u1EADp nh\u1EADt",
      status: "\u0110ang c\u1EADp nh\u1EADt",
      follow: "25.727",
      genres: ["Drama", "Manhua", "Ng\xF4n T\xECnh", "Romance", "Truy\u1EC7n M\xE0u"]
    },
    {
      id: 1,
      name: "Ki\u1EC1u M\u1EF5 Phu Lang, T\u1EA1i Tuy\u1EBFn L\u1EE5c Tr\xE0",
      thumbnail: "/images/spotlight-1.png",
      slug: "kieu-my-phu-lang-tai-tuyen-luc-tra-53686",
      updatedAt: "[C\u1EADp nh\u1EADt l\xFAc: 14:43 19/07/2022]",
      view: "2.422.242",
      author: "\u0110ang c\u1EADp nh\u1EADt",
      status: "\u0110ang c\u1EADp nh\u1EADt",
      follow: "38.423",
      genres: ["Drama", "Manhua", "Ng\xF4n T\xECnh", "Romance", "Truy\u1EC7n M\xE0u"]
    },
    {
      id: 4,
      name: "C\xF4 V\u01B0\u01A1ng Qu\u1EA3 N\u1EEF",
      thumbnail: "/images/spotlight-5.png",
      slug: "co-vuong-qua-nu-54444",
      updatedAt: "[C\u1EADp nh\u1EADt l\xFAc: 14:43 19/07/2022]",
      view: "6.763.201",
      author: "\u0110ang c\u1EADp nh\u1EADt",
      status: "\u0110ang c\u1EADp nh\u1EADt",
      follow: "46.578",
      genres: ["Comedy", "Manhua", "Ng\xF4n T\xECnh", "Truy\u1EC7n M\xE0u"]
    },
    {
      id: 2,
      name: "Mau Xuy\xEAn Kh\xF4ng R\u1EEDa T\u1ED9i Cho Nh\xE2n V\u1EADt Ph\u1EA3n Di\u1EC7n",
      thumbnail: "/images/spotlight-2.png",
      slug: "mau-xuyen-khong-rua-toi-cho-nhan-vat-phan-dien-45007",
      updatedAt: "[C\u1EADp nh\u1EADt l\xFAc: 14:43 19/07/2022]",
      view: "5.934.249",
      author: "\u0110ang c\u1EADp nh\u1EADt",
      status: "\u0110ang c\u1EADp nh\u1EADt",
      follow: "54.343",
      genres: ["C\u1ED5 \u0111\u1EA1i", "Manhua", "Ng\xF4n T\xECnh", "Truy\u1EC7n M\xE0u", "Xuy\xEAn Kh\xF4ng"]
    },
    {
      id: 3,
      name: "Manh S\u01B0 T\u1EA1i Th\u01B0\u1EE3ng",
      thumbnail: "/images/spotlight-3.png",
      slug: "manh-su-tai-thuong-23169",
      updatedAt: "[C\u1EADp nh\u1EADt l\xFAc: 14:43 19/07/2022]",
      view: "59.158.407",
      author: "\u0110ang c\u1EADp nh\u1EADt",
      status: "\u0110ang c\u1EADp nh\u1EADt",
      follow: "120.228",
      genres: ["C\u1ED5 \u0111\u1EA1i", "Manhua", "Ng\xF4n T\xECnh", "Truy\u1EC7n M\xE0u"]
    }
  ];
});

const spotlights$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': spotlights
});

const search = defineEventHandler(async (event) => {
  const API = repositoryFactory(NET_TRUYEN);
  const query = useQuery(event);
  const { genres, status, sort, limit } = query;
  const filterRequest = {
    genres,
    page: 1,
    status,
    top: sort,
    limit
  };
  const mangas = await (API == null ? void 0 : API.filter(filterRequest));
  if (mangas.status !== 200)
    return [];
  return mangas == null ? void 0 : mangas.data.data;
});

const search$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': search
});

const searchManga = defineEventHandler(async (event) => {
  const API = repositoryFactory(NET_TRUYEN);
  const query = useQuery(event);
  const { q } = query;
  const mangas = await (API == null ? void 0 : API.search(q));
  if (mangas.status !== 200)
    return [];
  return mangas == null ? void 0 : mangas.data.data;
});

const searchManga$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': searchManga
});

const recommendStory = defineEventHandler(async (event) => {
  const API = repositoryFactory(NET_TRUYEN);
  const query = useQuery(event);
  const { genres } = query;
  const filterRequest = {
    genres,
    page: 1,
    status: "all",
    sort: "new"
  };
  const mangas = await (API == null ? void 0 : API.filter(filterRequest));
  if (mangas.status !== 200)
    return [];
  return mangas == null ? void 0 : mangas.data.data;
});

const recommendStory$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': recommendStory
});

async function proxy(req, res) {
  const options = {
    responseType: "stream",
    headers: {
      referer: String("http://www.nettruyenco.com")
    }
  };
  const response = await axios.get(String("https://i338.ntcdntempv3.com/data/images/50543/778810/001.jpg?data=net"), options);
  return response.data.pipe(res);
}

const proxy$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': proxy
});

const ngonTinh = defineEventHandler(async () => {
  const API = repositoryFactory(NET_TRUYEN);
  const filterRequest = {
    genres: "co-dai-207",
    page: 1,
    sort: "month",
    limit: 16
  };
  const mangas = await (API == null ? void 0 : API.filter(filterRequest));
  if (mangas.status !== 200)
    return [];
  return mangas == null ? void 0 : mangas.data.data;
});

const ngonTinh$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': ngonTinh
});

const mangaUpdated = defineEventHandler(async (event) => {
  const API = repositoryFactory(NET_TRUYEN);
  const mangas = await (API == null ? void 0 : API.getNewMangaUpdated(1));
  if (mangas.status !== 200)
    return [];
  return mangas.data.data;
});

const mangaUpdated$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': mangaUpdated
});

const mangaNew = defineEventHandler(async (event) => {
  const API = repositoryFactory(NET_TRUYEN);
  const mangas = await (API == null ? void 0 : API.getNewManga(1));
  if (mangas.status !== 200)
    return [];
  return mangas.data.data;
});

const mangaNew$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': mangaNew
});

const followStory = defineEventHandler(async (event) => {
  const API = repositoryFactory(NET_TRUYEN);
  const query = useQuery(event);
  const { genres } = query;
  const filterRequest = {
    genres,
    page: 1,
    sort: "month",
    limit: 16
  };
  const mangas = await (API == null ? void 0 : API.filter(filterRequest));
  if (mangas.status !== 200)
    return [];
  return mangas == null ? void 0 : mangas.data.data;
});

const followStory$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': followStory
});

const filter = defineEventHandler(async (event) => {
  const query = useQuery(event);
  const { genres, view, status, gender, chapter } = query;
  const filterRequest = {
    genres,
    minchapter: chapter,
    status,
    top: view,
    gender
  };
  const NET_TRUYEN_API = repositoryFactory(NET_TRUYEN);
  const mangas = await (NET_TRUYEN_API == null ? void 0 : NET_TRUYEN_API.advancedSearch(filterRequest));
  if (mangas.status !== 200)
    return [];
  return mangas.data.data;
});

const filter$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': filter
});

const damMy = defineEventHandler(async () => {
  const API = repositoryFactory(NET_TRUYEN);
  const filterRequest = {
    genres: "dam-my",
    page: 1,
    limit: 8
  };
  const mangas = await (API == null ? void 0 : API.filter(filterRequest));
  if (mangas.status !== 200)
    return [];
  return mangas == null ? void 0 : mangas.data.data;
});

const damMy$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': damMy
});

const comic = defineEventHandler(async (event) => {
  const API = repositoryFactory(NET_TRUYEN);
  const query = useQuery(event);
  const { slug } = reactive(query);
  const mangas = await (API == null ? void 0 : API.getManga(slug));
  if (mangas.status !== 200)
    return [];
  return mangas == null ? void 0 : mangas.data.data;
});

const comic$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': comic
});

const chapters = defineEventHandler(async (event) => {
  const query = useQuery(event);
  const NET_TRUYEN_API = repositoryFactory(NET_TRUYEN);
  const { slug, chapter, id } = query;
  const chapters = await NET_TRUYEN_API.getChapters({
    slug,
    chapter,
    id
  });
  return chapters.data;
});

const chapters$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': chapters
});

function buildAssetsURL(...path) {
  return joinURL(publicAssetsURL(), useRuntimeConfig().app.buildAssetsDir, ...path);
}
function publicAssetsURL(...path) {
  const publicBase = useRuntimeConfig().app.cdnURL || useRuntimeConfig().app.baseURL;
  return path.length ? joinURL(publicBase, ...path) : publicBase;
}

const getClientManifest = () => import('/Users/bonn/Documents/GitHub/comedy-app/.nuxt/dist/server/client.manifest.mjs').then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);
const getServerEntry = () => import('/Users/bonn/Documents/GitHub/comedy-app/.nuxt/dist/server/server.mjs').then((r) => r.default || r);
const getSSRRenderer = lazyCachedFunction(async () => {
  const clientManifest = await getClientManifest();
  if (!clientManifest) {
    throw new Error("client.manifest is not available");
  }
  const createSSRApp = await getServerEntry();
  if (!createSSRApp) {
    throw new Error("Server bundle is not available");
  }
  const renderer = createRenderer(createSSRApp, {
    clientManifest,
    renderToString: renderToString$1,
    publicPath: buildAssetsURL()
  });
  async function renderToString$1(input, context) {
    const html = await renderToString(input, context);
    if (process.env.NUXT_VITE_NODE_OPTIONS) {
      renderer.rendererContext.updateManifest(await getClientManifest());
    }
    return `<div id="__nuxt">${html}</div>`;
  }
  return renderer;
});
const getSPARenderer = lazyCachedFunction(async () => {
  const clientManifest = await getClientManifest();
  const renderToString = (ssrContext) => {
    const config = useRuntimeConfig();
    ssrContext.payload = {
      serverRendered: false,
      config: {
        public: config.public,
        app: config.app
      }
    };
    let entryFiles = Object.values(clientManifest).filter((fileValue) => fileValue.isEntry);
    if ("all" in clientManifest && "initial" in clientManifest) {
      entryFiles = clientManifest.initial.map((file) => ({ file }));
    }
    return Promise.resolve({
      html: '<div id="__nuxt"></div>',
      renderResourceHints: () => "",
      renderStyles: () => entryFiles.flatMap(({ css }) => css).filter((css) => css != null).map((file) => `<link rel="stylesheet" href="${buildAssetsURL(file)}">`).join(""),
      renderScripts: () => entryFiles.map(({ file }) => {
        const isMJS = !file.endsWith(".js");
        return `<script ${isMJS ? 'type="module"' : ""} src="${buildAssetsURL(file)}"><\/script>`;
      }).join("")
    });
  };
  return { renderToString };
});
const renderer = eventHandler(async (event) => {
  const ssrError = event.req.url?.startsWith("/__nuxt_error") ? useQuery(event) : null;
  const url = ssrError?.url || event.req.url;
  const ssrContext = {
    url,
    event,
    req: event.req,
    res: event.res,
    runtimeConfig: useRuntimeConfig(),
    noSSR: !!event.req.headers["x-nuxt-no-ssr"],
    error: ssrError,
    nuxt: void 0,
    payload: void 0
  };
  const renderer = ssrContext.noSSR ? await getSPARenderer() : await getSSRRenderer();
  const rendered = await renderer.renderToString(ssrContext).catch((e) => {
    if (!ssrError) {
      throw e;
    }
  });
  if (!rendered) {
    return;
  }
  if (event.res.writableEnded) {
    return;
  }
  if (ssrContext.error && !ssrError) {
    throw ssrContext.error;
  }
  if (ssrContext.nuxt?.hooks) {
    await ssrContext.nuxt.hooks.callHook("app:rendered");
  }
  const html = await renderHTML(ssrContext.payload, rendered, ssrContext);
  event.res.setHeader("Content-Type", "text/html;charset=UTF-8");
  return html;
});
async function renderHTML(payload, rendered, ssrContext) {
  const state = `<script>window.__NUXT__=${devalue(payload)}<\/script>`;
  rendered.meta = rendered.meta || {};
  if (ssrContext.renderMeta) {
    Object.assign(rendered.meta, await ssrContext.renderMeta());
  }
  return htmlTemplate({
    HTML_ATTRS: rendered.meta.htmlAttrs || "",
    HEAD_ATTRS: rendered.meta.headAttrs || "",
    HEAD: (rendered.meta.headTags || "") + rendered.renderResourceHints() + rendered.renderStyles() + (ssrContext.styles || ""),
    BODY_ATTRS: rendered.meta.bodyAttrs || "",
    BODY_PREPEND: ssrContext.teleports?.body || "",
    APP: (rendered.meta.bodyScriptsPrepend || "") + rendered.html + state + rendered.renderScripts() + (rendered.meta.bodyScripts || "")
  });
}
function lazyCachedFunction(fn) {
  let res = null;
  return () => {
    if (res === null) {
      res = fn().catch((err) => {
        res = null;
        throw err;
      });
    }
    return res;
  };
}

const renderer$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': renderer
});
//# sourceMappingURL=index.mjs.map
