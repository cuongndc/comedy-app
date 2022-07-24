import {MANGA_PATH_NAME} from "~/contants";

const useMangaPagePath = (slug: string) => {
    useState('pickManga', () => slug);
    return `/${MANGA_PATH_NAME}?slug=${slug}`;
}

export default useMangaPagePath;