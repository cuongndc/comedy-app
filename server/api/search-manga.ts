import repositoryFactory, { NET_TRUYEN } from '~/services/repositoryFactory'

export default defineEventHandler(async (event) => {
  const API = repositoryFactory(NET_TRUYEN)

  const query = useQuery(event)
  const { q } = query

  const mangas = await API?.search(q as string)
  if (mangas.status !== 200)
    return []

  return mangas?.data.data
})
