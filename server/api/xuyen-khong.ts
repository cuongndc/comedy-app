import repositoryFactory, { NET_TRUYEN } from '~/services/repositoryFactory'
import type { FilterRequest } from '~/services/request'

export default defineEventHandler(async () => {
  const API = repositoryFactory(NET_TRUYEN)
  const filterRequest: FilterRequest = {
    genres: 'chuyen-sinh-2130',
    page: 1,
    sort: 'month' as any,
    limit: 9,
  }

  const mangas = await API?.filter(filterRequest)
  if (mangas.status !== 200)
    return []

  return mangas?.data.data
})
