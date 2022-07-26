import repositoryFactory, { NET_TRUYEN } from '~/services/repositoryFactory'

export default defineEventHandler(async (event) => {
  const API = repositoryFactory(NET_TRUYEN)
  const query = useQuery(event)
  const { page } = query

  const mangas = await API?.getNewMangaUpdated(page as any || 1)
  if (mangas.status !== 200)
    return []

  return mangas.data.data
})
