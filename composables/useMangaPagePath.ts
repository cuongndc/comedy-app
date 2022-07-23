import {MANGA_PATH_NAME, MANGA_PATH_READ_NAME} from "~/contants";
import {useState} from "#build/imports";

const useMangaPagePath = (slug: string) => {
    useState('pickManga', () => slug);
    return `/${MANGA_PATH_NAME}?slug=${slug}`;
}

export default useMangaPagePath;