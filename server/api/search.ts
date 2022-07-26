import repositoryFactory, { NET_TRUYEN } from '~/services/repositoryFactory'
import type { FilterRequest } from '~/services/request'

export default defineEventHandler(async (event) => {
  const API = repositoryFactory(NET_TRUYEN)

  const query = useQuery(event)
  const { genres, status, sort, limit } = query
  const filterRequest: FilterRequest = {
    genres: genres as any,
    page: 1,
    status: status as string,
    top: sort as string,
    limit: limit as any,
  }

  const mangas = await API?.filter(filterRequest)
  if (mangas.status !== 200)
    return []

  return mangas?.data.data
})
