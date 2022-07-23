import repositoryFactory, {NET_TRUYEN} from "~/services/repositoryFactory";
import {RankingMangeRequest} from "~/services/request";

export default defineEventHandler(async (event) => {
    const NET_TRUYEN_API = repositoryFactory(NET_TRUYEN);
    const rankingAllRequest: RankingMangeRequest = {
        status: undefined,
        top: 'all',
        page: 3,
        genre: 'manhua'
    }

    const mangas = await NET_TRUYEN_API?.getMangaRanking(rankingAllRequest);
    if (mangas.status !== 200)
        return []

    return mangas?.data.data
});