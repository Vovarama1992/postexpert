export interface Translation {
    id: number,
    code: string,
    label: string
}

export interface Item {
    name: string;
    slug: string;
    hrefValue?: string[];
}

export interface Section {
    id: number;
    code: string;
    name: string;
    items: Item[];
}