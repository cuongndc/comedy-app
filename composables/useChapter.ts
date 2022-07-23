import {MANGA_PATH_NAME, MANGA_PATH_READ_NAME, SourceParams} from "~/contants";
import {Manga, MangaDetails, keys} from "~/types";
import {useStorage} from "@vueuse/core";

const useChapter = async (chapterNumber: string, chapterId: string, slug: string) => {
    const {data: comic} = await useFetch(`/api/comic?slug=${slug}`);
    if (!comic.value) {
        return '';
    }

    const mangaDetail: MangaDetails = (comic.value as MangaDetails)
    // Cache manga detail to local storage
    useStorage(keys.mangaCacheDetail, mangaDetail);
    const path = `/${MANGA_PATH_NAME}/${MANGA_PATH_READ_NAME}/${slug}/${chapterNumber}/${chapterId}`;
    return path;
}

export default useChapter;