import repositoryFactory, {NET_TRUYEN} from "~/services/repositoryFactory";
import {FilterRequest} from "~/services/request";
import {MANGA_SORT} from "~/types";

export default defineEventHandler(async () => {
    const API = repositoryFactory(NET_TRUYEN);
    const filterRequest: FilterRequest = {
        genres: 'dam-my',
        page: 1,
        limit: 8,
    }

    const mangas = await API?.filter(filterRequest);
    if (mangas.status !== 200)
        return []

    return mangas?.data.data;

});