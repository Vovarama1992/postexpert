import {$api, __API__} from "@/lib";
import {Seo} from "@/types/seo";

export const generateMeta = async (locale: string, url: string, jsonLd?: any) => {

    const response = await fetch(`${__API__}${url}`, {
        headers: {
            locale
        }
    })

    const { seo } = await response.json()

    const page = seo as Seo

    return {
        title: page?.title ?? '',
        description: page?.description ?? '',
        keywords: page?.keywords,
        openGraph: {
            title: page?.title ?? '',
            description: page?.description ?? '',
            images: page?.image ?? '',
        },
    };
}
