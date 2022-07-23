import repositoryFactory, {NET_TRUYEN} from "~/services/repositoryFactory";
// import {FilterRequest} from "~/services/request";

export default defineEventHandler(async (event) => {
    const API = repositoryFactory(NET_TRUYEN);

    const mangas = await API?.getNewManga(1);

    if (mangas.status !== 200)
        return []

    return mangas.data.data;
});