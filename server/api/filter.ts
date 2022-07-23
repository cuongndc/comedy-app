import repositoryFactory, { NET_TRUYEN } from "~/services/repositoryFactory";
import { AdvanceQueryRequest, GENRES } from "~/services/request";

export default defineEventHandler(async (event) => {
  const query = useQuery(event);
  const { genres, view, status, gender, chapter } = query;

  const filterRequest: AdvanceQueryRequest = {
    genres: genres as any,
    minchapter: chapter as any,
    status: status as string,
    top: view as string,
    gender: gender as any
  };

  const NET_TRUYEN_API = repositoryFactory(NET_TRUYEN);
  const mangas = await NET_TRUYEN_API?.advancedSearch(filterRequest);

  if (mangas.status !== 200) return [];

  return mangas.data.data;
});
