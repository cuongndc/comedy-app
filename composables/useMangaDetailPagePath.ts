import {MANGA_PATH_DETAIL_NAME, MANGA_PATH_NAME} from "~/contants";

const useMangaDetailPagePath = (slug: string) => {
    useState('pickManga', () => slug);
    return `/${MANGA_PATH_NAME}/${MANGA_PATH_DETAIL_NAME}/${slug}`;
}

export default useMangaDetailPagePath;