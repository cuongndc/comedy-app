import {ChapterImg, Manga, ComicPreview, SearchResponseData, ServerResponse} from "~/types";

export interface SearchResponse extends ServerResponse {
    data: SearchResponseData[];
}

export interface ChapterResponse extends ServerResponse {
    data: ChapterImg[];
}

export interface MangaResponse extends ServerResponse {
    data: Manga[];
}

export interface ComicPreviewResponse extends ServerResponse {
    data: ComicPreview
}