import {MANGA_PATH_NAME, MANGA_PATH_READ_NAME, SourceParams} from "~/contants";
import {keys, Manga, MangaDetails} from "~/types";
import {useStorage} from "@vueuse/core";

const useLastPathChapter = async (spotlight: Manga, slugs: string | readonly string[]) => {
    const slug = slugs || spotlight?.slug
    const comic = await $fetch(`/api/comic?slug=${slug}`);
    if (!comic) {
        return '';
    }

    const mangas: MangaDetails = (comic as MangaDetails)
    // Cache manga detail to local storage
    const cache = useStorage(keys.mangaCacheDetail, '');
    cache.value = null
    cache.value = JSON.stringify(mangas)
    const chapterId = mangas?.chapterList && mangas?.chapterList[mangas.chapterList?.length].chapterId;
    const chapterNumber = mangas.chapterList && mangas.chapterList[mangas.chapterList?.length].chapterNumber;

    return `/${MANGA_PATH_NAME}/${MANGA_PATH_READ_NAME}/${slug}/${chapterNumber}/${chapterId}`;
}

export default useLastPathChapter;