import repositoryFactory, {NET_TRUYEN} from "~/services/repositoryFactory";

export default defineEventHandler(async (event) => {
    const query = useQuery(event);

    const NET_TRUYEN_API = repositoryFactory(NET_TRUYEN);
    const {slug, chapter, id} = query;

    const chapters = await NET_TRUYEN_API.getChapters({
        slug: slug as string,
        chapter: chapter as string,
        id: id as string
    });

    return chapters.data;
});