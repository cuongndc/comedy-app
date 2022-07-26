import type { AxiosResponse } from 'axios'
import type { ChapterResponse, ComicPreviewResponse, MangaResponse, SearchResponse } from './response'
import type { AdvanceQueryRequest, ChapterRequest, FilterRequest, RankingMangeRequest } from './request'
import type { SourceCrawl } from '~/types'
import NetTruyenRepository from '~/services/repositorys/netTruyenRepository'

export const NET_TRUYEN = 'nettruyen'

export interface Repository {
  filter: (req: FilterRequest) => Promise<AxiosResponse<MangaResponse>>
  search: (mangaTitle: string) => Promise<AxiosResponse<SearchResponse>>
  getManga: (slug: string) => Promise<AxiosResponse<ComicPreviewResponse>>
  getChapters: (req: ChapterRequest) => Promise<AxiosResponse<ChapterResponse>>
  getNewMangaUpdated: (page: number) => Promise<AxiosResponse<MangaResponse>>
  getNewManga: (page?: number, genres?: string) => Promise<AxiosResponse<MangaResponse>>
  getMangaRanking: (req: RankingMangeRequest) => Promise<AxiosResponse<MangaResponse>>
  advancedSearch: (queryObj: AdvanceQueryRequest) => Promise<AxiosResponse<MangaResponse>>
}

export default function repositoryFactory(name: SourceCrawl) {
  switch (name) {
    case NET_TRUYEN:
      return NetTruyenRepository
    default:
      return null
  }
}
