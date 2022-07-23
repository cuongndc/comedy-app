import repositoryFactory, { NET_TRUYEN } from "~/services/repositoryFactory";
import { FilterRequest } from "~/services/request";

export default defineEventHandler(async () => {
  const API = repositoryFactory(NET_TRUYEN);
  const filterRequest: FilterRequest = {
    page: 1,
    sort: "month" as any,
    status: "all",
    limit: 16,
  };

  const mangas = await API?.filter(filterRequest);
  if (mangas.status !== 200) return [];

  return mangas?.data.data;
});
