import {MANGA_PATH_NAME, MANGA_PATH_PREVIEW_NAME} from "~/contants";

export default function useNavigatorComicPreview(slug: string) {
    return `/${MANGA_PATH_NAME}/${MANGA_PATH_PREVIEW_NAME}/${slug}`;
}