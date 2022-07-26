import repositoryFactory, { NET_TRUYEN } from '~/services/repositoryFactory'
import type { FilterRequest } from '~/services/request'

export default defineEventHandler(async (event) => {
  const API = repositoryFactory(NET_TRUYEN)
  const query = useQuery(event)
  const { genres } = query

  const filterRequest: FilterRequest = {
    genres: genres as string,
    page: 1,
    // status: 'all',
    sort: 'month' as any,
    limit: 16,
  }

  const mangas = await API?.filter(filterRequest)
  if (mangas.status !== 200)
    return []

  return mangas?.data.data
})
