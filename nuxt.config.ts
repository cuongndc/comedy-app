import {defineNuxtConfig} from 'nuxt';

export default defineNuxtConfig({
    app: {
        buildAssetsDir: "/assets/",
    },
    ssr: true,
    runtimeConfig: {
        public: {
            NUXT_PUBLIC_SERVICE_URL: process.env.NUXT_PUBLIC_SERVICE_URL,
            DOMAIN: process.env.DOMAIN,
            SIZE_NAME: process.env.SIZE_NAME,
        },
    },
  pwa: {
        meta: {
            name: 'Truyện tranh online - Miễn phí - Không quảng cáo',
            author: process.env.SIZE_NAME,
            description: `Web đọc truyện tranh online lớn nhất được cập nhật liên tục mỗi ngày - Cùng tham gia đọc truyện và thảo luận với hơn 💚10 triệu thành viên tại ${process.env.SIZE_NAME}`,
            mobileAppIOS: true,
            mobileApp: true,
            ogHost: process.env.DOMAIN,
            twitterCard: 'summary',
            twitterSite: process.env.SIZE_NAME,
            twitterCreator: process.env.SIZE_NAME
        },
        manifest: {
            name: process.env.DOMAIN,
            short_name: process.env.SIZE_NAME,
            background_color: '#111827',
            theme_color: '#f43f5f',
        },
        workbox: {
            enabled: true,
        }
    },
    // meta: {
    //     title: "Truyện tranh online - Miễn phí - Không quảng cáo",
    //     link: [
    //         {
    //             rel: "icon",
    //             type: "image/x-icon",
    //             href: "https://i.im.ge/2022/07/15/FotbqY.png",
    //         },
    //     ],
    // },
    // experimental: {
    //     reactivityTransform: true,
    //     viteNode: false,
    // },
    // image: {
    //     dir: "public/",
    //     staticFilename: "[publicPath]/[name]-[hash][ext]",
    //     domains: ["meetruyen.com", "meetruyen.netlify.app"],
    //     screens: {
    //         xs: 320,
    //         sm: 640,
    //         md: 768,
    //         lg: 1024,
    //         xl: 1280,
    //         xxl: 1536,
    //         "2xl": 1536,
    //     },
    // },
    modules: ["@kevinmarrec/nuxt-pwa", "@nuxt/image-edge", "@pinia/nuxt"],
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
    css: ["~/assets/css/tailwindcss.css", "~/assets/css/main.css"],
});
