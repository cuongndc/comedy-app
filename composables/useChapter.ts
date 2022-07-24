import {MANGA_PATH_NAME, MANGA_PATH_READ_NAME} from "~/contants";
import {keys, MangaDetails} from "~/types";
import {useStorage} from "@vueuse/core";

const useChapter = async (chapterNumber: string, chapterId: string, slug: string) => {
    const comic = await $fetch(`/api/comic?slug=${slug}`);
    if (!comic) {
        return '';
    }

    const mangaDetail: MangaDetails = (comic as MangaDetails)
    // Cache manga detail to local storage
    useStorage(keys.mangaCacheDetail, mangaDetail);
    return `/${MANGA_PATH_NAME}/${MANGA_PATH_READ_NAME}/${slug}/${chapterNumber}/${chapterId}`;
}

export default useChapter;