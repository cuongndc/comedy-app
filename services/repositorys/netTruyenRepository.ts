import client from "~/services/client";
// @ts-ignore
import {ChapterRequest, RankingMangeRequest, Repository} from "~/services/repositoryFactory";
import {AdvanceQueryRequest, FilterRequest} from "~/services/request";

export const SOURCE_PREFIX = "nt";

const netTruyenAPI: Repository = {
    advancedSearch: (req: AdvanceQueryRequest) => {
        return client.get(`${SOURCE_PREFIX}/advanced-search`, {
            params: req,
        });
    },

    filter: (req: FilterRequest) => {
        return client.get(`${SOURCE_PREFIX}/filters`, {
            params: {
                page: req.page ? req.page : undefined,
                genres: req.genres ? req.genres : undefined,
                sort: req.sort ? req.sort : undefined,
                status: req.status ? req.status : undefined,
                limit: req.limit ? req.limit : undefined,
            },
        });
    },

    search: async (mangaTitle: string) => {
        return client.get(`${SOURCE_PREFIX}/search`, {
            params: {q: mangaTitle},
        });
    },

    getManga: (slug: string) => {
        return client.get(`${SOURCE_PREFIX}/manga/${slug}`);
    },

    getChapters(req: ChapterRequest) {
        const url = `${SOURCE_PREFIX}/chapter/${req.slug}/${req.chapter}/${req.id}`;
        return client.get(url);
    },

    getNewMangaUpdated(page: number) {
        return client.get(`${SOURCE_PREFIX}/new-updated`, {
            params: {page: page ? page : undefined},
        });
    },

    getNewManga(page?: number, genres?: string) {
        return client.get(`${SOURCE_PREFIX}/new`, {
            params: {
                page: page ? page : undefined,
                genres: genres ? genres : undefined,
            },
        });
    },

    getMangaRanking(req: RankingMangeRequest) {
        return client.get(`${SOURCE_PREFIX}/ranking`, {
            params: {
                page: req.page ? req.page : undefined,
                top: req.top ? req.top : undefined,
                status: req.status ? req.status : undefined,
                genres: req.genre ? req.genre : undefined,
            },
        });
    }
}

export default netTruyenAPI;