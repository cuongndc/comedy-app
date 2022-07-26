import repositoryFactory, { NET_TRUYEN } from '~/services/repositoryFactory'

export default defineEventHandler(async () => {
  const API = repositoryFactory(NET_TRUYEN)

  const mangas = await API?.getNewManga(1)

  if (mangas.status !== 200)
    return []

  return mangas.data.data
})
