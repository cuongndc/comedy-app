import repositoryFactory, {NET_TRUYEN} from "~/services/repositoryFactory";

export default defineEventHandler(async (event) => {
    const API = repositoryFactory(NET_TRUYEN);
    const mangas = await API?.getNewMangaUpdated(1);

    if (mangas.status !== 200)
        return []

    return mangas.data.data;
});