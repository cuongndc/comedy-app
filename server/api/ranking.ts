import repositoryFactory, { NET_TRUYEN } from '~/services/repositoryFactory'
import type { RankingMangeRequest } from '~/services/request'

export default defineEventHandler(async (event) => {
  const API = repositoryFactory(NET_TRUYEN)

  const query = useQuery(event)
  const { genres, status, sort, page } = query

  const rankingAllRequest: RankingMangeRequest = {
    status: status as string,
    top: sort as string,
    page: page as any,
    genre: genres as any,
  }

  const mangas = await API?.getMangaRanking(rankingAllRequest)
  if (mangas.status !== 200)
    return []

  return mangas?.data.data
})
