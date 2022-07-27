import repositoryFactory, { NET_TRUYEN } from '~/services/repositoryFactory'
import type { FilterRequest } from '~/services/request'

export default defineEventHandler(async () => {
  const API = repositoryFactory(NET_TRUYEN)
  const filterRequest: FilterRequest = {
    genres: 'co-dai-207',
    page: 1,
    sort: 'month' as any,
    limit: 9,
  }

  const filterDamMy: FilterRequest = {
    genres: 'dam-my',
    page: 1,
    limit: 9,
  }

  const filterXuyenKhong: FilterRequest = {
    genres: 'chuyen-sinh-2130',
    page: 1,
    sort: 'month' as any,
    limit: 9,
  }

  const data = {
    damMy: await API?.filter(filterDamMy),
    xuyenKhong: await API?.filter(filterXuyenKhong),
    ngonTinh: await API?.filter(filterRequest),
  }

  return data
})
