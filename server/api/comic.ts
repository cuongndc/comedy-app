import MangaModel from "~/serveless/models/manga.model";
import {SourceCollection, SourceParams} from "~/contants";
import {reactive} from 'vue';
import repositoryFactory, {NET_TRUYEN} from "~/services/repositoryFactory";
import {RankingMangeRequest} from "~/services/request";

export default defineEventHandler(async (event) => {
    const API = repositoryFactory(NET_TRUYEN);

    const query = useQuery(event);
    const {slug} = reactive(query);

    const mangas = await API?.getManga(slug as string);
    if (mangas.status !== 200)
        return []

    return mangas?.data.data
})