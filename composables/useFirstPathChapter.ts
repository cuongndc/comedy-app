import {MANGA_PATH_NAME, MANGA_PATH_READ_NAME} from "~/contants";
import {keys, Manga} from "~/types";
import {useStorage} from "@vueuse/core";

const useFirstPathChapter = async (spotlight: Manga, slugs: string | readonly string[]) => {
    const slug = slugs || spotlight?.slug
    const mangas: any = useStorage(keys.mangaCacheDetail, {
        serializer: {
            read: (v: any) => v ? JSON.parse(v) : null,
            write: (v: any) => JSON.stringify(v),
        }
    });

    const visitedComics: any = useStorage(keys.visitedComics, {
        serializer: {
            read: (v: any) => v ? JSON.parse(v) : null,
            write: (v: any) => JSON.stringify(v),
        }
    });

    if (visitedComics.value && visitedComics.value.length > 0) {
        const existingComic = visitedComics.value?.find((comic: any) => comic.slug === slug);
        if (!existingComic) {

            visitedComics.value.push({
                slug,
                ...mangas.value
            });
        }
    } else {
        visitedComics.value = [{
            slug,
            ...mangas.value
        }];
    }

    const chapterId = mangas.value?.chapterList && mangas.value?.chapterList[mangas.value.chapterList?.length - 1].chapterId;
    const chapterNumber = mangas.value.chapterList && mangas.value.chapterList[mangas.value.chapterList?.length - 1].chapterNumber;

    return `/${MANGA_PATH_NAME}/${MANGA_PATH_READ_NAME}/${slug}/${chapterNumber}/${chapterId}`;
}

export default useFirstPathChapter;