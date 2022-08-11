globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};globalThis.__timing__.logStart('Load chunks/nitro/node-server');import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'http';
import { Server } from 'https';
import destr from 'destr';
import { defineEventHandler, handleCacheHeaders, createEvent, eventHandler, createError, lazyEventHandler, createApp, createRouter } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ohmyfetch';
import { createRouter as createRouter$1 } from 'radix3';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import { hash } from 'ohash';
import { parseURL, withQuery, withLeadingSlash, withoutTrailingSlash } from 'ufo';
import { createStorage } from 'unstorage';
import { promises } from 'fs';
import { dirname, resolve } from 'pathe';
import { fileURLToPath } from 'url';
import { createProxyMiddleware } from 'nuxt-proxy/middleware';
import { fileURLToPath as fileURLToPath$1 } from 'node:url';
import { createIPX, createIPXMiddleware } from 'ipx';

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/assets/","cdnURL":""},"nitro":{"routes":{},"envPrefix":"NUXT_"},"public":{"domain":"https://meetoon.co","siteName":"MEETOON","imgCDN":"https://6z1a4akz.cdn.imgeng.in/"},"proxy":{"options":{"target":"http://service.meetoon.co","changeOrigin":true,"pathRewrite":{"^/api/proxy":"/api/wb"},"pathFilter":["/api/proxy"]}},"ipx":{"dir":"","domains":["meetoon.co","meetruyen.com"],"sharp":{},"alias":{}}};
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
const config = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => config;
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

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

const useStorage = () => storage;

storage.mount('/assets', assets$1);

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
      const url = event.req.originalUrl || event.req.url;
      const friendlyName = decodeURI(parseURL(url).pathname).replace(/[^a-zA-Z0-9]/g, "").substring(0, 16);
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
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
    description: "",
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

const assets = {
  "/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1804-MwP6wQpN6n/BsLfhyyT5iFT03M4\"",
    "mtime": "2022-08-11T03:50:25.290Z",
    "path": "../public/.DS_Store"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"3c2e-1wu/mwWpai4Cw0OMrOR2NIWxrTI\"",
    "mtime": "2022-08-11T03:50:25.290Z",
    "path": "../public/favicon.ico"
  },
  "/icon.png": {
    "type": "image/png",
    "etag": "\"5c1d-mpGu6s6iZzai2O3MwSKZEVnzLKc\"",
    "mtime": "2022-08-11T03:50:25.289Z",
    "path": "../public/icon.png"
  },
  "/manifest.579c8d44.json": {
    "type": "application/json",
    "etag": "\"9a6-Z9fyfGaGLtXESBL7hjNdbXpXnfg\"",
    "mtime": "2022-08-11T03:50:25.240Z",
    "path": "../public/manifest.579c8d44.json"
  },
  "/robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"16-iUOtJ2RsHfdY9DoQxaq0wz1LZCU\"",
    "mtime": "2022-08-11T03:50:25.273Z",
    "path": "../public/robots.txt"
  },
  "/sw.js": {
    "type": "application/javascript",
    "etag": "\"5a2-l8fKxp+EeYRWHojyorrxEV5RUi8\"",
    "mtime": "2022-08-11T03:50:25.239Z",
    "path": "../public/sw.js"
  },
  "/assets/CateList-7dcd0a79.mjs": {
    "type": "application/javascript",
    "etag": "\"28c-LqQtLmeo3Ut/2jkES1trBgSpx9o\"",
    "mtime": "2022-08-11T03:50:25.272Z",
    "path": "../public/assets/CateList-7dcd0a79.mjs"
  },
  "/assets/Catelog-2bbbada5.mjs": {
    "type": "application/javascript",
    "etag": "\"72c-BCgkV0N8E0qLTDsZz1yT5jMFfB4\"",
    "mtime": "2022-08-11T03:50:25.272Z",
    "path": "../public/assets/Catelog-2bbbada5.mjs"
  },
  "/assets/Chaplist-2171d48b.mjs": {
    "type": "application/javascript",
    "etag": "\"445-BO46cTemOMIK+MScWVkPXmL7rH4\"",
    "mtime": "2022-08-11T03:50:25.272Z",
    "path": "../public/assets/Chaplist-2171d48b.mjs"
  },
  "/assets/ChapterImg-c69991ce.mjs": {
    "type": "application/javascript",
    "etag": "\"1d0-k6naDUFPJee1UZuLKB2l+QPD5/w\"",
    "mtime": "2022-08-11T03:50:25.272Z",
    "path": "../public/assets/ChapterImg-c69991ce.mjs"
  },
  "/assets/ChapterRepresent-a98f5891.mjs": {
    "type": "application/javascript",
    "etag": "\"2a6-oVNjSONUtv6QDTkqG/Y1xmCyaP0\"",
    "mtime": "2022-08-11T03:50:25.271Z",
    "path": "../public/assets/ChapterRepresent-a98f5891.mjs"
  },
  "/assets/ChapterTab-929e318a.mjs": {
    "type": "application/javascript",
    "etag": "\"580-SOStTnDtbw8GiqUow/aIaX8TYSg\"",
    "mtime": "2022-08-11T03:50:25.271Z",
    "path": "../public/assets/ChapterTab-929e318a.mjs"
  },
  "/assets/ComicChapterTab-fb2375f3.mjs": {
    "type": "application/javascript",
    "etag": "\"592-9Z+t/K7u0RT7Xyq0HH5oHZvSWgA\"",
    "mtime": "2022-08-11T03:50:25.271Z",
    "path": "../public/assets/ComicChapterTab-fb2375f3.mjs"
  },
  "/assets/ComicItem-b3899e40.mjs": {
    "type": "application/javascript",
    "etag": "\"5b1-gwfCsP4gZJkTseuF93356xKsNe0\"",
    "mtime": "2022-08-11T03:50:25.271Z",
    "path": "../public/assets/ComicItem-b3899e40.mjs"
  },
  "/assets/ComicTab-3470aebf.mjs": {
    "type": "application/javascript",
    "etag": "\"341-l6/D2/A3+rdgXwZdKeS2QTH+UHs\"",
    "mtime": "2022-08-11T03:50:25.271Z",
    "path": "../public/assets/ComicTab-3470aebf.mjs"
  },
  "/assets/CommentComic-2f9d9a9f.mjs": {
    "type": "application/javascript",
    "etag": "\"80-RosO6/fiG2bcVrRUZeKZNhr0n/U\"",
    "mtime": "2022-08-11T03:50:25.271Z",
    "path": "../public/assets/CommentComic-2f9d9a9f.mjs"
  },
  "/assets/MeeToonImg-61cb557b.mjs": {
    "type": "application/javascript",
    "etag": "\"319-v7Szcg40nSt20p9zZ7CvJdHKeh0\"",
    "mtime": "2022-08-11T03:50:25.270Z",
    "path": "../public/assets/MeeToonImg-61cb557b.mjs"
  },
  "/assets/NewStory-ad247265.mjs": {
    "type": "application/javascript",
    "etag": "\"306-uppYgLh41t38KjD2pYClL/vQFjc\"",
    "mtime": "2022-08-11T03:50:25.270Z",
    "path": "../public/assets/NewStory-ad247265.mjs"
  },
  "/assets/NewStory-d918f712.mjs": {
    "type": "application/javascript",
    "etag": "\"2f3-AZ3vc29DQ8bE+e/2Z273mo6wM4Y\"",
    "mtime": "2022-08-11T03:50:25.270Z",
    "path": "../public/assets/NewStory-d918f712.mjs"
  },
  "/assets/NoveItem-de8d031b.mjs": {
    "type": "application/javascript",
    "etag": "\"54d-bNe7QUeSZK0eI2/XKh1SHoVYD84\"",
    "mtime": "2022-08-11T03:50:25.270Z",
    "path": "../public/assets/NoveItem-de8d031b.mjs"
  },
  "/assets/PageLoading-01606937.mjs": {
    "type": "application/javascript",
    "etag": "\"166-7fv/Fs0tUm2p36B1x+iYr6LnYGg\"",
    "mtime": "2022-08-11T03:50:25.270Z",
    "path": "../public/assets/PageLoading-01606937.mjs"
  },
  "/assets/ReadMangaFooter-5d6aa708.mjs": {
    "type": "application/javascript",
    "etag": "\"494-B8hC4cY+dLthZhSDHrUxxskNGJU\"",
    "mtime": "2022-08-11T03:50:25.270Z",
    "path": "../public/assets/ReadMangaFooter-5d6aa708.mjs"
  },
  "/assets/RepresentCategory-47ff892f.mjs": {
    "type": "application/javascript",
    "etag": "\"c62-EVTcykkFqsL3n2KrBoujYr6iDnA\"",
    "mtime": "2022-08-11T03:50:25.269Z",
    "path": "../public/assets/RepresentCategory-47ff892f.mjs"
  },
  "/assets/RepresentCategory-d14cdf7a.mjs": {
    "type": "application/javascript",
    "etag": "\"c85-zXgmqrFkA9q5EuwnCBWDqACZKfQ\"",
    "mtime": "2022-08-11T03:50:25.269Z",
    "path": "../public/assets/RepresentCategory-d14cdf7a.mjs"
  },
  "/assets/SearchLoading-f3f65a1d.mjs": {
    "type": "application/javascript",
    "etag": "\"c0e-hEnv4ED9hvpp5ynCz4yEHb3kFV8\"",
    "mtime": "2022-08-11T03:50:25.269Z",
    "path": "../public/assets/SearchLoading-f3f65a1d.mjs"
  },
  "/assets/Spotlight-1f297e44.mjs": {
    "type": "application/javascript",
    "etag": "\"518-0lbhdoKC1AVvVHN4YZbKKJj8508\"",
    "mtime": "2022-08-11T03:50:25.269Z",
    "path": "../public/assets/Spotlight-1f297e44.mjs"
  },
  "/assets/Spotlight-2ff80ae9.mjs": {
    "type": "application/javascript",
    "etag": "\"480-+2Myxk7aivAdh+0nzZVIQnTsi0Y\"",
    "mtime": "2022-08-11T03:50:25.269Z",
    "path": "../public/assets/Spotlight-2ff80ae9.mjs"
  },
  "/assets/TheFooter-eff6dde0.mjs": {
    "type": "application/javascript",
    "etag": "\"b76-+sUsMhU5o7eSg7RlBZ0X7qgEcQg\"",
    "mtime": "2022-08-11T03:50:25.268Z",
    "path": "../public/assets/TheFooter-eff6dde0.mjs"
  },
  "/assets/TheHeader-a17770ff.mjs": {
    "type": "application/javascript",
    "etag": "\"3dc-AEL2uYzzhA/kirvpMOzyxCddOTA\"",
    "mtime": "2022-08-11T03:50:25.268Z",
    "path": "../public/assets/TheHeader-a17770ff.mjs"
  },
  "/assets/Trending-3852b0e0.mjs": {
    "type": "application/javascript",
    "etag": "\"9c4-i3a5Rt8TVKntZ5rFStw63LoIj1o\"",
    "mtime": "2022-08-11T03:50:25.268Z",
    "path": "../public/assets/Trending-3852b0e0.mjs"
  },
  "/assets/Trending-872ca50a.mjs": {
    "type": "application/javascript",
    "etag": "\"9fc-765n1VqEcPJVDs8NKyp55GZvIG0\"",
    "mtime": "2022-08-11T03:50:25.268Z",
    "path": "../public/assets/Trending-872ca50a.mjs"
  },
  "/assets/VisitedComic-84bdb158.mjs": {
    "type": "application/javascript",
    "etag": "\"838-imivoxD7HGiRWHq/9V036jSCnHU\"",
    "mtime": "2022-08-11T03:50:25.268Z",
    "path": "../public/assets/VisitedComic-84bdb158.mjs"
  },
  "/assets/__id_-51af7142.mjs": {
    "type": "application/javascript",
    "etag": "\"149e-fdvsrb1UAh1uQlz2pYfDguS3tGM\"",
    "mtime": "2022-08-11T03:50:25.267Z",
    "path": "../public/assets/__id_-51af7142.mjs"
  },
  "/assets/__id_-7b6e661f.mjs": {
    "type": "application/javascript",
    "etag": "\"c0f-bnYLfX/S7nc0dgBHflTds7TA3R4\"",
    "mtime": "2022-08-11T03:50:25.267Z",
    "path": "../public/assets/__id_-7b6e661f.mjs"
  },
  "/assets/__id_-7f6a506d.mjs": {
    "type": "application/javascript",
    "etag": "\"193d-lzcxNixOL+UQsS5miPHZ/qGxIsM\"",
    "mtime": "2022-08-11T03:50:25.267Z",
    "path": "../public/assets/__id_-7f6a506d.mjs"
  },
  "/assets/_slug_-39b3af30.mjs": {
    "type": "application/javascript",
    "etag": "\"157c-RSh8EzUgRDauqG8PCBEUaAXiuDE\"",
    "mtime": "2022-08-11T03:50:25.267Z",
    "path": "../public/assets/_slug_-39b3af30.mjs"
  },
  "/assets/_slug_-4bcaca21.mjs": {
    "type": "application/javascript",
    "etag": "\"5cb-5xGJgKnHumN2ORrZhYAh0BWrBmk\"",
    "mtime": "2022-08-11T03:50:25.267Z",
    "path": "../public/assets/_slug_-4bcaca21.mjs"
  },
  "/assets/_slug_-5ea6bed6.mjs": {
    "type": "application/javascript",
    "etag": "\"5c9-l/JJ71kbFFycdraX4yjR84Ehhdg\"",
    "mtime": "2022-08-11T03:50:25.266Z",
    "path": "../public/assets/_slug_-5ea6bed6.mjs"
  },
  "/assets/_slug_-90537161.mjs": {
    "type": "application/javascript",
    "etag": "\"620-XvVOSFAiOPMANKmiFmExhRnPi1o\"",
    "mtime": "2022-08-11T03:50:25.266Z",
    "path": "../public/assets/_slug_-90537161.mjs"
  },
  "/assets/autoplay-bba7bcfb.mjs": {
    "type": "application/javascript",
    "etag": "\"bdc-H6Iktblvi3K8v6k3ADEOdToQjRY\"",
    "mtime": "2022-08-11T03:50:25.266Z",
    "path": "../public/assets/autoplay-bba7bcfb.mjs"
  },
  "/assets/default-8c7296d9.mjs": {
    "type": "application/javascript",
    "etag": "\"199-F1DkLGNgwAxLPy9IEsJrte+WRMI\"",
    "mtime": "2022-08-11T03:50:25.266Z",
    "path": "../public/assets/default-8c7296d9.mjs"
  },
  "/assets/entry-2f3658bf.mjs": {
    "type": "application/javascript",
    "etag": "\"391d7-CS+lCRmL9uXXdlsTS/tZ/UnhyrE\"",
    "mtime": "2022-08-11T03:50:25.266Z",
    "path": "../public/assets/entry-2f3658bf.mjs"
  },
  "/assets/entry.fa0f9e10.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"881e-Kuiqey828gQ3jaSA0MTPJ76xqxo\"",
    "mtime": "2022-08-11T03:50:25.265Z",
    "path": "../public/assets/entry.fa0f9e10.css"
  },
  "/assets/error-404-8f63c3ad.mjs": {
    "type": "application/javascript",
    "etag": "\"822-4j5dmkqZt1lYsesGdOhfhwcgFcY\"",
    "mtime": "2022-08-11T03:50:25.265Z",
    "path": "../public/assets/error-404-8f63c3ad.mjs"
  },
  "/assets/error-404.314f7075.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"11bd-kF6SKfdJYaoPOx5XSNB4IuKqq6c\"",
    "mtime": "2022-08-11T03:50:25.265Z",
    "path": "../public/assets/error-404.314f7075.css"
  },
  "/assets/error-500-31fd2dd9.mjs": {
    "type": "application/javascript",
    "etag": "\"6cb-UP6w6C9d/jvw/0dpTMXfGqa9aUQ\"",
    "mtime": "2022-08-11T03:50:25.265Z",
    "path": "../public/assets/error-500-31fd2dd9.mjs"
  },
  "/assets/error-500.4e3461e5.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"af4-ckENJljqPJ6JYcymKbQpp8F2r1I\"",
    "mtime": "2022-08-11T03:50:25.264Z",
    "path": "../public/assets/error-500.4e3461e5.css"
  },
  "/assets/error-component-d5697877.mjs": {
    "type": "application/javascript",
    "etag": "\"425-fqSwTzNixfB5/bqJNFAC1buxbSw\"",
    "mtime": "2022-08-11T03:50:25.264Z",
    "path": "../public/assets/error-component-d5697877.mjs"
  },
  "/assets/fetch-36372476.mjs": {
    "type": "application/javascript",
    "etag": "\"2ed-s9kCnHLfjvRMbbNWt7wmh//rhKk\"",
    "mtime": "2022-08-11T03:50:25.264Z",
    "path": "../public/assets/fetch-36372476.mjs"
  },
  "/assets/grid-55226633.mjs": {
    "type": "application/javascript",
    "etag": "\"488-8X9mECUbMrQBPMlqPGcTz+qyZZo\"",
    "mtime": "2022-08-11T03:50:25.264Z",
    "path": "../public/assets/grid-55226633.mjs"
  },
  "/assets/index-0d05d814.mjs": {
    "type": "application/javascript",
    "etag": "\"15a-vClJaRYLmE6YZvhhIizzLtdoP+M\"",
    "mtime": "2022-08-11T03:50:25.259Z",
    "path": "../public/assets/index-0d05d814.mjs"
  },
  "/assets/index-15b9c0b3.mjs": {
    "type": "application/javascript",
    "etag": "\"c0a-xZPSFzNui8OaHg3ArfdURoUCRz0\"",
    "mtime": "2022-08-11T03:50:25.259Z",
    "path": "../public/assets/index-15b9c0b3.mjs"
  },
  "/assets/index-78533fc5.mjs": {
    "type": "application/javascript",
    "etag": "\"15a-LpEtN743gBC984fDdYjTyE/mr28\"",
    "mtime": "2022-08-11T03:50:25.258Z",
    "path": "../public/assets/index-78533fc5.mjs"
  },
  "/assets/index-a7823269.mjs": {
    "type": "application/javascript",
    "etag": "\"8d8-Hl1/4OphGzdYgERnwLt0mleutCs\"",
    "mtime": "2022-08-11T03:50:25.258Z",
    "path": "../public/assets/index-a7823269.mjs"
  },
  "/assets/index-b351655c.mjs": {
    "type": "application/javascript",
    "etag": "\"81-UwFiXQTk7Q8xq0jYypVaJ+lfSV4\"",
    "mtime": "2022-08-11T03:50:25.258Z",
    "path": "../public/assets/index-b351655c.mjs"
  },
  "/assets/index-b64c2975.mjs": {
    "type": "application/javascript",
    "etag": "\"59d-O3P6qTFB/AhzEROF8z5xZLLB7MA\"",
    "mtime": "2022-08-11T03:50:25.258Z",
    "path": "../public/assets/index-b64c2975.mjs"
  },
  "/assets/index-f7ae0635.mjs": {
    "type": "application/javascript",
    "etag": "\"d95-5QWXXfFRp6XHNrohi8O9Unb7wq4\"",
    "mtime": "2022-08-11T03:50:25.258Z",
    "path": "../public/assets/index-f7ae0635.mjs"
  },
  "/assets/manga-47a9e722.mjs": {
    "type": "application/javascript",
    "etag": "\"194-6YWClf4jli3/A5m3TSknNTk+NJQ\"",
    "mtime": "2022-08-11T03:50:25.257Z",
    "path": "../public/assets/manga-47a9e722.mjs"
  },
  "/assets/manifest.json": {
    "type": "application/json",
    "etag": "\"41a0-bx0T0Ay6AyTYS8Bb89N5WZDanAc\"",
    "mtime": "2022-08-11T03:50:25.257Z",
    "path": "../public/assets/manifest.json"
  },
  "/assets/menu-e0f28b80.mjs": {
    "type": "application/javascript",
    "etag": "\"199-SYYc2oaeQBzM1JgipfYX0mooN7E\"",
    "mtime": "2022-08-11T03:50:25.257Z",
    "path": "../public/assets/menu-e0f28b80.mjs"
  },
  "/assets/swiper-slide-497d5ee3.mjs": {
    "type": "application/javascript",
    "etag": "\"48ad-IKfK3JJA26cQPWtzkmwkoAQrOe8\"",
    "mtime": "2022-08-11T03:50:25.256Z",
    "path": "../public/assets/swiper-slide-497d5ee3.mjs"
  },
  "/assets/trending-2758b938.mjs": {
    "type": "application/javascript",
    "etag": "\"bc6-ElJCo1H5Hnu7FuJDL8mxoRANows\"",
    "mtime": "2022-08-11T03:50:25.256Z",
    "path": "../public/assets/trending-2758b938.mjs"
  },
  "/assets/truyen-chu-hot-e514ec6d.mjs": {
    "type": "application/javascript",
    "etag": "\"c62-6j2P5gkEtvTVjWu2dly+KrJlzNE\"",
    "mtime": "2022-08-11T03:50:25.256Z",
    "path": "../public/assets/truyen-chu-hot-e514ec6d.mjs"
  },
  "/assets/welcome-501260af.mjs": {
    "type": "application/javascript",
    "etag": "\"2dcb-46y45E70M61ULySArmcR1da3njw\"",
    "mtime": "2022-08-11T03:50:25.256Z",
    "path": "../public/assets/welcome-501260af.mjs"
  },
  "/images/bg-spotlight.png": {
    "type": "image/png",
    "etag": "\"afce-Fv92f75+twXYgi7IhMurXn3C/YU\"",
    "mtime": "2022-08-11T03:50:25.280Z",
    "path": "../public/images/bg-spotlight.png"
  },
  "/images/bg-wrapper-spotlight.png": {
    "type": "image/png",
    "etag": "\"14ddf-naVXN9F2enq+MJHhgCb4iiVNFP8\"",
    "mtime": "2022-08-11T03:50:25.279Z",
    "path": "../public/images/bg-wrapper-spotlight.png"
  },
  "/images/category.png": {
    "type": "image/png",
    "etag": "\"857-E65BKOki9tXQ+iUe1t0+97yohKc\"",
    "mtime": "2022-08-11T03:50:25.279Z",
    "path": "../public/images/category.png"
  },
  "/images/dam-my.png": {
    "type": "image/png",
    "etag": "\"96d9-FGyvJa2ABdzlSz/cr338ggdkNEM\"",
    "mtime": "2022-08-11T03:50:25.279Z",
    "path": "../public/images/dam-my.png"
  },
  "/images/huyen-huyen.png": {
    "type": "image/png",
    "etag": "\"88f7-WNKcF+vfYPMHUeTfwehM2bhgJ6E\"",
    "mtime": "2022-08-11T03:50:25.279Z",
    "path": "../public/images/huyen-huyen.png"
  },
  "/images/img-avatar.png": {
    "type": "image/png",
    "etag": "\"1f4a-Mv7atszIBIS+Gs9JYfFRzccyzXg\"",
    "mtime": "2022-08-11T03:50:25.278Z",
    "path": "../public/images/img-avatar.png"
  },
  "/images/mao-hiem.png": {
    "type": "image/png",
    "etag": "\"9fea-q7aahfuruaacccLx99Mo3TosRFU\"",
    "mtime": "2022-08-11T03:50:25.278Z",
    "path": "../public/images/mao-hiem.png"
  },
  "/images/nu-cuong.png": {
    "type": "image/png",
    "etag": "\"9402-Z2c0olLUOM77c5ydX+gWeu8KwUc\"",
    "mtime": "2022-08-11T03:50:25.278Z",
    "path": "../public/images/nu-cuong.png"
  },
  "/images/ranking.png": {
    "type": "image/png",
    "etag": "\"82c-/xslGZS+mtDeoIlpem5pCeqfEJ0\"",
    "mtime": "2022-08-11T03:50:25.278Z",
    "path": "../public/images/ranking.png"
  },
  "/images/spotlight-1.png": {
    "type": "image/png",
    "etag": "\"6e167-QR1+PI/vDr3jPvyOTWx6LPJbRUI\"",
    "mtime": "2022-08-11T03:50:25.278Z",
    "path": "../public/images/spotlight-1.png"
  },
  "/images/spotlight-2.png": {
    "type": "image/png",
    "etag": "\"20734-2ZjV6bURjiLLPEGRhoK8i+0Kons\"",
    "mtime": "2022-08-11T03:50:25.277Z",
    "path": "../public/images/spotlight-2.png"
  },
  "/images/spotlight-3.png": {
    "type": "image/png",
    "etag": "\"1f6b8-cIpGQEjNfizyaXbDGRTd7x7rmyA\"",
    "mtime": "2022-08-11T03:50:25.277Z",
    "path": "../public/images/spotlight-3.png"
  },
  "/images/spotlight-5.png": {
    "type": "image/png",
    "etag": "\"2fdfb-vjpSmy63NYvM/1IIhCap1yrJqJ0\"",
    "mtime": "2022-08-11T03:50:25.276Z",
    "path": "../public/images/spotlight-5.png"
  },
  "/images/spotlight-7.png": {
    "type": "image/png",
    "etag": "\"6b158-fgnxEDxvJSQqAO99kHRgHqZlrwM\"",
    "mtime": "2022-08-11T03:50:25.276Z",
    "path": "../public/images/spotlight-7.png"
  },
  "/images/tong-tai.png": {
    "type": "image/png",
    "etag": "\"7bd2-bKpMyMVdKevDX5rHj6U9+tmNs3E\"",
    "mtime": "2022-08-11T03:50:25.275Z",
    "path": "../public/images/tong-tai.png"
  },
  "/images/truong-hoc.png": {
    "type": "image/png",
    "etag": "\"a103-1Dcggw6172hOqXZLQW2LJ8KSy74\"",
    "mtime": "2022-08-11T03:50:25.273Z",
    "path": "../public/images/truong-hoc.png"
  },
  "/loading/pikachu.gif": {
    "type": "image/gif",
    "etag": "\"4c13-MHExx3jwuiJAx783AUS958gqaxQ\"",
    "mtime": "2022-08-11T03:50:25.273Z",
    "path": "../public/loading/pikachu.gif"
  },
  "/assets/icons/120x120.af090742.png": {
    "type": "image/png",
    "etag": "\"1ea2-Bo9T9KMbXzDh4hqfEupntkNws8Q\"",
    "mtime": "2022-08-11T03:50:25.255Z",
    "path": "../public/assets/icons/120x120.af090742.png"
  },
  "/assets/icons/120x120.maskable.af090742.png": {
    "type": "image/png",
    "etag": "\"17b2-N92yGdmt0CZF3qYmrIJ7xW43UVs\"",
    "mtime": "2022-08-11T03:50:25.255Z",
    "path": "../public/assets/icons/120x120.maskable.af090742.png"
  },
  "/assets/icons/144x144.af090742.png": {
    "type": "image/png",
    "etag": "\"24e3-FF67bU+bET9678Dn4fhWEdl4vy8\"",
    "mtime": "2022-08-11T03:50:25.254Z",
    "path": "../public/assets/icons/144x144.af090742.png"
  },
  "/assets/icons/144x144.maskable.af090742.png": {
    "type": "image/png",
    "etag": "\"1d91-9ow7r94STY9lPnM40j7YD4ilNbg\"",
    "mtime": "2022-08-11T03:50:25.254Z",
    "path": "../public/assets/icons/144x144.maskable.af090742.png"
  },
  "/assets/icons/152x152.af090742.png": {
    "type": "image/png",
    "etag": "\"273f-5QjwH5p5LSE5sFRdtcDIdTfdZMQ\"",
    "mtime": "2022-08-11T03:50:25.254Z",
    "path": "../public/assets/icons/152x152.af090742.png"
  },
  "/assets/icons/152x152.maskable.af090742.png": {
    "type": "image/png",
    "etag": "\"1f54-8kxm+9fDuEEXFMRUiUFNVWQRal4\"",
    "mtime": "2022-08-11T03:50:25.253Z",
    "path": "../public/assets/icons/152x152.maskable.af090742.png"
  },
  "/assets/icons/192x192.af090742.png": {
    "type": "image/png",
    "etag": "\"32b2-LH+MnW75Xyz/DcPmKJSXBr+LAfM\"",
    "mtime": "2022-08-11T03:50:25.253Z",
    "path": "../public/assets/icons/192x192.af090742.png"
  },
  "/assets/icons/192x192.maskable.af090742.png": {
    "type": "image/png",
    "etag": "\"2790-EuDIoUTqlPEJq73Zbw47qjEAwxc\"",
    "mtime": "2022-08-11T03:50:25.253Z",
    "path": "../public/assets/icons/192x192.maskable.af090742.png"
  },
  "/assets/icons/384x384.af090742.png": {
    "type": "image/png",
    "etag": "\"703c-98X2hkfpZZ5z+BsX0gucbFAaSL8\"",
    "mtime": "2022-08-11T03:50:25.252Z",
    "path": "../public/assets/icons/384x384.af090742.png"
  },
  "/assets/icons/384x384.maskable.af090742.png": {
    "type": "image/png",
    "etag": "\"5681-K6e23MVR50jXJ+qym7SkSugRqFk\"",
    "mtime": "2022-08-11T03:50:25.252Z",
    "path": "../public/assets/icons/384x384.maskable.af090742.png"
  },
  "/assets/icons/512x512.af090742.png": {
    "type": "image/png",
    "etag": "\"3c90-VUCr35aEGCYrqtxtaI0F6WrTh1s\"",
    "mtime": "2022-08-11T03:50:25.252Z",
    "path": "../public/assets/icons/512x512.af090742.png"
  },
  "/assets/icons/512x512.maskable.af090742.png": {
    "type": "image/png",
    "etag": "\"7b01-koWx138wzx/bIpmAzkuznFMJBIw\"",
    "mtime": "2022-08-11T03:50:25.251Z",
    "path": "../public/assets/icons/512x512.maskable.af090742.png"
  },
  "/assets/icons/64x64.af090742.png": {
    "type": "image/png",
    "etag": "\"f22-BeuCFbDFCqnP16JlAp+3W6tOAXQ\"",
    "mtime": "2022-08-11T03:50:25.251Z",
    "path": "../public/assets/icons/64x64.af090742.png"
  },
  "/assets/icons/64x64.maskable.af090742.png": {
    "type": "image/png",
    "etag": "\"cb9-RcpzG9wzYOErS0iBXkAUy3FsE1A\"",
    "mtime": "2022-08-11T03:50:25.251Z",
    "path": "../public/assets/icons/64x64.maskable.af090742.png"
  },
  "/icons/chapterItem/icon-comment.svg": {
    "type": "image/svg+xml",
    "etag": "\"30a-tKaEVrz0AGgkFsmtzZoiK249TOg\"",
    "mtime": "2022-08-11T03:50:25.289Z",
    "path": "../public/icons/chapterItem/icon-comment.svg"
  },
  "/icons/chapterItem/icon-like.svg": {
    "type": "image/svg+xml",
    "etag": "\"338-Mu3PLBD3C+VbyRHNntvb/evTs98\"",
    "mtime": "2022-08-11T03:50:25.289Z",
    "path": "../public/icons/chapterItem/icon-like.svg"
  },
  "/icons/chapterItem/icon-view.svg": {
    "type": "image/svg+xml",
    "etag": "\"2ff-EuS8o4d69l/BxN7Ip58G0DNY2ZU\"",
    "mtime": "2022-08-11T03:50:25.289Z",
    "path": "../public/icons/chapterItem/icon-view.svg"
  },
  "/icons/comicPage/backgroundInfo.png": {
    "type": "image/png",
    "etag": "\"30d4-o2f3aSZrDK2vB+thMfxXpqIPbxc\"",
    "mtime": "2022-08-11T03:50:25.289Z",
    "path": "../public/icons/comicPage/backgroundInfo.png"
  },
  "/icons/comicPage/icon-back.svg": {
    "type": "image/svg+xml",
    "etag": "\"119-EYaRxectNOBTtXeZEsmwnSTB+bQ\"",
    "mtime": "2022-08-11T03:50:25.288Z",
    "path": "../public/icons/comicPage/icon-back.svg"
  },
  "/icons/comicPage/icon-comment-count.svg": {
    "type": "image/svg+xml",
    "etag": "\"28a-PgPoMRg6jcTxhJURo48TG+lc6Ss\"",
    "mtime": "2022-08-11T03:50:25.288Z",
    "path": "../public/icons/comicPage/icon-comment-count.svg"
  },
  "/icons/comicPage/icon-follow-count.svg": {
    "type": "image/svg+xml",
    "etag": "\"3c2-mcOabHBYmJOjYl1TSMVRd9w3sCA\"",
    "mtime": "2022-08-11T03:50:25.288Z",
    "path": "../public/icons/comicPage/icon-follow-count.svg"
  },
  "/icons/comicPage/icon-follow.svg": {
    "type": "image/svg+xml",
    "etag": "\"3c2-mcOabHBYmJOjYl1TSMVRd9w3sCA\"",
    "mtime": "2022-08-11T03:50:25.288Z",
    "path": "../public/icons/comicPage/icon-follow.svg"
  },
  "/icons/comicPage/icon-promote.png": {
    "type": "image/png",
    "etag": "\"ae6-ChBGJd6lmGsfyZoYsPfoavAeQys\"",
    "mtime": "2022-08-11T03:50:25.288Z",
    "path": "../public/icons/comicPage/icon-promote.png"
  },
  "/icons/comicPage/icon-report.svg": {
    "type": "image/svg+xml",
    "etag": "\"2f8-tcGpENfuInaasFGvALGYLxbxxSk\"",
    "mtime": "2022-08-11T03:50:25.288Z",
    "path": "../public/icons/comicPage/icon-report.svg"
  },
  "/icons/comicPage/icon-share.svg": {
    "type": "image/svg+xml",
    "etag": "\"4db-suvf51D+kGPy94FT1U0BiisG6Lc\"",
    "mtime": "2022-08-11T03:50:25.287Z",
    "path": "../public/icons/comicPage/icon-share.svg"
  },
  "/icons/comicPage/icon-star-deactive.svg": {
    "type": "image/svg+xml",
    "etag": "\"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk\"",
    "mtime": "2022-08-11T03:50:25.287Z",
    "path": "../public/icons/comicPage/icon-star-deactive.svg"
  },
  "/icons/comicPage/icon-star.svg": {
    "type": "image/svg+xml",
    "etag": "\"33d-leI151VDTgvlK2pUxO+VRE19rR0\"",
    "mtime": "2022-08-11T03:50:25.287Z",
    "path": "../public/icons/comicPage/icon-star.svg"
  },
  "/icons/comicPage/icon-view-count.svg": {
    "type": "image/svg+xml",
    "etag": "\"2ff-RCrIOPQmJIjlK3sNCpVZ2JPJRsA\"",
    "mtime": "2022-08-11T03:50:25.287Z",
    "path": "../public/icons/comicPage/icon-view-count.svg"
  },
  "/icons/header/icon-back-white.svg": {
    "type": "image/svg+xml",
    "etag": "\"f0-AHS3nfopH5kdniGlg2rbUHb5sVE\"",
    "mtime": "2022-08-11T03:50:25.287Z",
    "path": "../public/icons/header/icon-back-white.svg"
  },
  "/icons/header/icon-search.svg": {
    "type": "image/svg+xml",
    "etag": "\"1ab-YJ8OrjmJIGFDfBMQQABSueOkt/w\"",
    "mtime": "2022-08-11T03:50:25.286Z",
    "path": "../public/icons/header/icon-search.svg"
  },
  "/icons/homePage/icon-view-chapter.svg": {
    "type": "image/svg+xml",
    "etag": "\"30e-+XXJMOqo2k6wq93ILanbxLFS15E\"",
    "mtime": "2022-08-11T03:50:25.286Z",
    "path": "../public/icons/homePage/icon-view-chapter.svg"
  },
  "/icons/menuBar/category_v2.png": {
    "type": "image/png",
    "etag": "\"2376-yvt9WKk1G+wIw8MFk04Ql6MovLs\"",
    "mtime": "2022-08-11T03:50:25.286Z",
    "path": "../public/icons/menuBar/category_v2.png"
  },
  "/icons/menuBar/community_v2.png": {
    "type": "image/png",
    "etag": "\"23e1-pZLzP6foJ0eTIdW0kAK208ddVZk\"",
    "mtime": "2022-08-11T03:50:25.286Z",
    "path": "../public/icons/menuBar/community_v2.png"
  },
  "/icons/menuBar/follow_v2.png": {
    "type": "image/png",
    "etag": "\"2295-io44b51HHQoBgWf80zlIk51aOWc\"",
    "mtime": "2022-08-11T03:50:25.286Z",
    "path": "../public/icons/menuBar/follow_v2.png"
  },
  "/icons/menuBar/mission_v2.png": {
    "type": "image/png",
    "etag": "\"24a8-RPdmEXiRaMT6aUQL34YXAUs8Yj8\"",
    "mtime": "2022-08-11T03:50:25.285Z",
    "path": "../public/icons/menuBar/mission_v2.png"
  },
  "/icons/menuBar/ranking_v2.png": {
    "type": "image/png",
    "etag": "\"2274-hbGfGZGZmbanqR2HkhbwMZtquTk\"",
    "mtime": "2022-08-11T03:50:25.285Z",
    "path": "../public/icons/menuBar/ranking_v2.png"
  },
  "/icons/novelChapterPage/icon-arrow-down.svg": {
    "type": "image/svg+xml",
    "etag": "\"13d-DAvclMLweya6I+XTwA4HJO1AY+Y\"",
    "mtime": "2022-08-11T03:50:25.285Z",
    "path": "../public/icons/novelChapterPage/icon-arrow-down.svg"
  },
  "/icons/novelChapterPage/icon-back.svg": {
    "type": "image/svg+xml",
    "etag": "\"11a-xrq0+MckOb9+JL/7sOxBLvH7IbE\"",
    "mtime": "2022-08-11T03:50:25.285Z",
    "path": "../public/icons/novelChapterPage/icon-back.svg"
  },
  "/icons/novelChapterPage/icon-comment.svg": {
    "type": "image/svg+xml",
    "etag": "\"294-5zR/8//Qr241j4gjQ/86yza1+l0\"",
    "mtime": "2022-08-11T03:50:25.285Z",
    "path": "../public/icons/novelChapterPage/icon-comment.svg"
  },
  "/icons/novelChapterPage/icon-follow-footer-unactive.svg": {
    "type": "image/svg+xml",
    "etag": "\"3c6-m+rAJ7GwieJB6CHsX7wFf+6a/N0\"",
    "mtime": "2022-08-11T03:50:25.284Z",
    "path": "../public/icons/novelChapterPage/icon-follow-footer-unactive.svg"
  },
  "/icons/novelChapterPage/icon-footer-setting.svg": {
    "type": "image/svg+xml",
    "etag": "\"2f7-pQDcMACLQ2LwPVedu4WtzZ3f3AQ\"",
    "mtime": "2022-08-11T03:50:25.284Z",
    "path": "../public/icons/novelChapterPage/icon-footer-setting.svg"
  },
  "/icons/novelChapterPage/icon-next.svg": {
    "type": "image/svg+xml",
    "etag": "\"285-73gsAhjW7yLqKPwJA+KECyRcH1o\"",
    "mtime": "2022-08-11T03:50:25.284Z",
    "path": "../public/icons/novelChapterPage/icon-next.svg"
  },
  "/icons/novelChapterPage/icon-prev.svg": {
    "type": "image/svg+xml",
    "etag": "\"287-PYJF+hqQ1pXz7Dz0L6uprcnDZmA\"",
    "mtime": "2022-08-11T03:50:25.284Z",
    "path": "../public/icons/novelChapterPage/icon-prev.svg"
  },
  "/icons/novelChapterPage/icon-report.svg": {
    "type": "image/svg+xml",
    "etag": "\"2f6-THXBp2o3aDBA9/ZyJoa5h2cE56E\"",
    "mtime": "2022-08-11T03:50:25.284Z",
    "path": "../public/icons/novelChapterPage/icon-report.svg"
  },
  "/icons/novelChapterPage/icon-share.svg": {
    "type": "image/svg+xml",
    "etag": "\"4f0-Un1dC+G0iymWU8YmO1EWw1IuRmQ\"",
    "mtime": "2022-08-11T03:50:25.284Z",
    "path": "../public/icons/novelChapterPage/icon-share.svg"
  },
  "/icons/searchPage/icon-back.svg": {
    "type": "image/svg+xml",
    "etag": "\"f0-NujVPaP8y67ZtwgqY9O0QkCh7ss\"",
    "mtime": "2022-08-11T03:50:25.283Z",
    "path": "../public/icons/searchPage/icon-back.svg"
  },
  "/icons/searchPage/icon-close.svg": {
    "type": "image/svg+xml",
    "etag": "\"20b-Nq/7L9bkiCddZSY0Xm4X8/mFdlM\"",
    "mtime": "2022-08-11T03:50:25.283Z",
    "path": "../public/icons/searchPage/icon-close.svg"
  },
  "/icons/searchPage/icon-search.svg": {
    "type": "image/svg+xml",
    "etag": "\"1ff-bbuK3n5mjvz2hNkwLX81QEeKbtc\"",
    "mtime": "2022-08-11T03:50:25.283Z",
    "path": "../public/icons/searchPage/icon-search.svg"
  },
  "/icons/searchPage/icon-star.svg": {
    "type": "image/svg+xml",
    "etag": "\"30e-xOosY3V0XdXZf7KUQyFRh0gN0UM\"",
    "mtime": "2022-08-11T03:50:25.283Z",
    "path": "../public/icons/searchPage/icon-star.svg"
  },
  "/icons/searchPage/icon-view-count.svg": {
    "type": "image/svg+xml",
    "etag": "\"2ff-EuS8o4d69l/BxN7Ip58G0DNY2ZU\"",
    "mtime": "2022-08-11T03:50:25.283Z",
    "path": "../public/icons/searchPage/icon-view-count.svg"
  },
  "/icons/tabbar/icon-canhan.svg": {
    "type": "image/svg+xml",
    "etag": "\"5b0-QgHHSy6i78LIgWCWol0tHvfsJNY\"",
    "mtime": "2022-08-11T03:50:25.282Z",
    "path": "../public/icons/tabbar/icon-canhan.svg"
  },
  "/icons/tabbar/icon-newsfeed.svg": {
    "type": "image/svg+xml",
    "etag": "\"66f-B/o0NLlN4OPOTUBooEFdc2zRl6M\"",
    "mtime": "2022-08-11T03:50:25.282Z",
    "path": "../public/icons/tabbar/icon-newsfeed.svg"
  },
  "/icons/tabbar/icon-novel-active.svg": {
    "type": "image/svg+xml",
    "etag": "\"936-IS0BtzHMXjmAC5CJo4N+6kmbt/E\"",
    "mtime": "2022-08-11T03:50:25.282Z",
    "path": "../public/icons/tabbar/icon-novel-active.svg"
  },
  "/icons/tabbar/icon-novel.svg": {
    "type": "image/svg+xml",
    "etag": "\"936-hOMOXh2+fGNAlYTGhu09kfNIB3Y\"",
    "mtime": "2022-08-11T03:50:25.282Z",
    "path": "../public/icons/tabbar/icon-novel.svg"
  },
  "/icons/tabbar/icon-toon-active.svg": {
    "type": "image/svg+xml",
    "etag": "\"67d-A5yStXKRiUCbVR4qfno/x3Skk5Q\"",
    "mtime": "2022-08-11T03:50:25.282Z",
    "path": "../public/icons/tabbar/icon-toon-active.svg"
  },
  "/icons/tabbar/icon-toon.svg": {
    "type": "image/svg+xml",
    "etag": "\"69f-G988y5OIA6mLzGSSgFc+h4+R8YI\"",
    "mtime": "2022-08-11T03:50:25.282Z",
    "path": "../public/icons/tabbar/icon-toon.svg"
  },
  "/icons/tabbar/icon-tutruyen.svg": {
    "type": "image/svg+xml",
    "etag": "\"650-AgiyMw1qU7jOgUv5W/U1W+hyxk8\"",
    "mtime": "2022-08-11T03:50:25.281Z",
    "path": "../public/icons/tabbar/icon-tutruyen.svg"
  },
  "/images/trending/bg-trending.png": {
    "type": "image/png",
    "etag": "\"bd222-hJzVmGMgWNspLIVzjjiCCds+AC4\"",
    "mtime": "2022-08-11T03:50:25.274Z",
    "path": "../public/images/trending/bg-trending.png"
  },
  "/icons/widgets/trend/img-header-novel.svg": {
    "type": "image/svg+xml",
    "etag": "\"20ac9-u/wYMWK/qez/ChEej8yQ2WiFnss\"",
    "mtime": "2022-08-11T03:50:25.281Z",
    "path": "../public/icons/widgets/trend/img-header-novel.svg"
  },
  "/icons/widgets/trend/img-header.svg": {
    "type": "image/svg+xml",
    "etag": "\"3fa0b-LgQNTFo/k4fJnjlNaSm46AmHX4E\"",
    "mtime": "2022-08-11T03:50:25.281Z",
    "path": "../public/icons/widgets/trend/img-header.svg"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = ["/assets","/assets"];

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base of publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = ["HEAD", "GET"];
const _f4b49z = eventHandler(async (event) => {
  if (event.req.method && !METHODS.includes(event.req.method)) {
    return;
  }
  let id = decodeURIComponent(withLeadingSlash(withoutTrailingSlash(parseURL(event.req.url).pathname)));
  let asset;
  for (const _id of [id, id + "/index.html"]) {
    const _asset = getAsset(_id);
    if (_asset) {
      asset = _asset;
      id = _id;
      break;
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.res.statusCode = 304;
    event.res.end("Not Modified (etag)");
    return;
  }
  const ifModifiedSinceH = event.req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime) {
    if (new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
      event.res.statusCode = 304;
      event.res.end("Not Modified (mtime)");
      return;
    }
  }
  if (asset.type) {
    event.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag) {
    event.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime) {
    event.res.setHeader("Last-Modified", asset.mtime);
  }
  const contents = await readAsset(id);
  event.res.end(contents);
});

const _v49n7p = createProxyMiddleware({ "target": "http://service.meetoon.co", "changeOrigin": true, "pathRewrite": { "^/api/proxy": "/api/wb" }, "pathFilter": ["/api/proxy"] });

const _uR6ovl = lazyEventHandler(() => {
  const ipxOptions = {
    ...useRuntimeConfig().ipx || {},
    dir: fileURLToPath$1(new URL("../public", globalThis._importMeta_.url))
  };
  const ipx = createIPX(ipxOptions);
  const middleware = createIPXMiddleware(ipx);
  return eventHandler(async (event) => {
    event.req.url = withLeadingSlash(event.context.params._);
    await middleware(event.req, event.res);
  });
});

const _lazy_1mbNW8 = () => import('../trending.mjs');
const _lazy_WHBJoW = () => import('../_slug_.mjs');
const _lazy_ya8RSQ = () => import('../read-comic.mjs');
const _lazy_LxyAFO = () => import('../trending2.mjs');
const _lazy_1jipKl = () => import('../related.post.mjs');
const _lazy_Jn2S6N = () => import('../read-novel.mjs');
const _lazy_WJiWee = () => import('../information.mjs');
const _lazy_tXQq0x = () => import('../_slug_2.mjs');
const _lazy_tu2PlR = () => import('../chapters.mjs');
const _lazy_XUh2K0 = () => import('../_slug_3.mjs');
const _lazy_Jyv2bI = () => import('../homepage.mjs');
const _lazy_1tvghZ = () => import('../home-novel.mjs');
const _lazy_0Svp7f = () => import('../_slug_4.mjs');
const _lazy_iTrADS = () => import('../search.mjs');
const _lazy_TQ7zl6 = () => import('../related.post2.mjs');
const _lazy_Ij9S53 = () => import('../__id_.mjs');
const _lazy_t0w8lA = () => import('../chapters2.mjs');
const _lazy_b1GDrx = () => import('../handlers/renderer.mjs').then(function (n) { return n.r; });

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/api/trending', handler: _lazy_1mbNW8, lazy: true, middleware: false, method: undefined },
  { route: '/api/tag/:slug', handler: _lazy_WHBJoW, lazy: true, middleware: false, method: undefined },
  { route: '/api/read-comic', handler: _lazy_ya8RSQ, lazy: true, middleware: false, method: undefined },
  { route: '/api/novel/trending', handler: _lazy_LxyAFO, lazy: true, middleware: false, method: undefined },
  { route: '/api/novel/related', handler: _lazy_1jipKl, lazy: true, middleware: false, method: "post" },
  { route: '/api/novel/read-novel', handler: _lazy_Jn2S6N, lazy: true, middleware: false, method: undefined },
  { route: '/api/novel/information', handler: _lazy_WJiWee, lazy: true, middleware: false, method: undefined },
  { route: '/api/novel/danh-muc/:slug', handler: _lazy_tXQq0x, lazy: true, middleware: false, method: undefined },
  { route: '/api/novel/chapters', handler: _lazy_tu2PlR, lazy: true, middleware: false, method: undefined },
  { route: '/api/novel/:slug', handler: _lazy_XUh2K0, lazy: true, middleware: false, method: undefined },
  { route: '/api/homepage', handler: _lazy_Jyv2bI, lazy: true, middleware: false, method: undefined },
  { route: '/api/home-novel', handler: _lazy_1tvghZ, lazy: true, middleware: false, method: undefined },
  { route: '/api/danh-muc/:slug', handler: _lazy_0Svp7f, lazy: true, middleware: false, method: undefined },
  { route: '/api/comic/search', handler: _lazy_iTrADS, lazy: true, middleware: false, method: undefined },
  { route: '/api/comic/related', handler: _lazy_TQ7zl6, lazy: true, middleware: false, method: "post" },
  { route: '/api/comic/:slug/:_id', handler: _lazy_Ij9S53, lazy: true, middleware: false, method: undefined },
  { route: '/api/chapters', handler: _lazy_t0w8lA, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_b1GDrx, lazy: true, middleware: false, method: undefined },
  { route: '', handler: _v49n7p, lazy: false, middleware: true, method: undefined },
  { route: '/_ipx/**', handler: _uR6ovl, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_b1GDrx, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
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

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, nitroApp.h3App.nodeHandler) : new Server$1(nitroApp.h3App.nodeHandler);
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const hostname = process.env.NITRO_HOST || process.env.HOST || "0.0.0.0";
server.listen(port, hostname, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  console.log(`Listening on ${protocol}://${hostname}:${port}${useRuntimeConfig().app.baseURL}`);
});
{
  process.on("unhandledRejection", (err) => console.error("[nitro] [dev] [unhandledRejection] " + err));
  process.on("uncaughtException", (err) => console.error("[nitro] [dev] [uncaughtException] " + err));
}
const nodeServer = {};

export { nodeServer as n, useRuntimeConfig as u };;globalThis.__timing__.logEnd('Load chunks/nitro/node-server');
//# sourceMappingURL=node-server.mjs.map
