import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
  ssr: true,
  runtimeConfig: {
    public: {
      NUXT_PUBLIC_SERVICE_URL: process.env.NUXT_PUBLIC_SERVICE_URL,
      DOMAIN: process.env.DOMAIN,
      SIZE_NAME: process.env.SIZE_NAME,
    },
  },
  meta: {
    title: "Truyện tranh online - Miễn phí - Không quảng cáo",
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "https://i.im.ge/2022/07/15/FotbqY.png",
      },
    ],
  },
  experimental: {
    reactivityTransform: true,
    viteNode: false,
  },
  image: {
    dir: "public/",
    staticFilename: "[publicPath]/[name]-[hash][ext]",
    domains: ["meetruyen.com", "meetruyen.netlify.app"],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      "2xl": 1536,
    },
  },
  modules: ["@nuxt/image-edge", '@pinia/nuxt',],
  build: {
    transpile: ["@heroicons/vue"],
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
  css: ["~/assets/css/main.css"],
});
