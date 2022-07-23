export const REVALIDATE_TIME = 3 * 60 * 60; //3h

export const SourceCollection: { [key: string]: string } = {
    nt: "http://www.nettruyenco.com"
}

export const SourceParams = {
    netTruyen: "nt"
}

export const MANGA_PATH_NAME = 'manga';
export const MANGA_PATH_DETAIL_NAME = 'detail';
export const MANGA_PATH_READ_NAME = 'read';

export const TailwindColors = [
    '#facc15',
    '#a3e635',
    '#fbbf24',
    '#34d399',
    '#fb923c',
    '#22d3ee',
    '#f87171',
    '#38bdf8',
    '#f472b6',
    '#818cf8',
    '#fb7185',
    '#a78bfa',
    '#e879f9',
];

export interface DropDownLink {
    title: string;
    href: string;
}