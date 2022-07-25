import {SourceCrawl} from "~/types";
import {AxiosResponse} from "axios";
import {SearchResponse, ChapterResponse, MangaResponse, ComicPreviewResponse} from './response';
import {RankingMangeRequest, ChapterRequest, FilterRequest, AdvanceQueryRequest} from './request';

export const NET_TRUYEN = "nettruyen";
import NetTruyenRepository from '~/services/repositorys/netTruyenRepository';

export interface Repository {
    filter: (req: FilterRequest) => Promise<AxiosResponse<MangaResponse>>;
    search: (mangaTitle: string) => Promise<AxiosResponse<SearchResponse>>;
    getManga: (slug: string) => Promise<AxiosResponse<ComicPreviewResponse>>;
    getChapters: (req: ChapterRequest) => Promise<AxiosResponse<ChapterResponse>>;
    getNewMangaUpdated: (page: number) => Promise<AxiosResponse<MangaResponse>>;
    getNewManga: (page?: number, genres?: string) => Promise<AxiosResponse<MangaResponse>>
    getMangaRanking: (req: RankingMangeRequest) => Promise<AxiosResponse<MangaResponse>>;
    advancedSearch: (queryObj: AdvanceQueryRequest) => Promise<AxiosResponse<MangaResponse>>;
}

export default function repositoryFactory(name: SourceCrawl) {
    switch (name) {
        case NET_TRUYEN:
            return NetTruyenRepository;
        default:
            return null;

    }
};