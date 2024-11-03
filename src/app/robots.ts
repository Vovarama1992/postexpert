import {MetadataRoute} from 'next';

export default function robots(): MetadataRoute.Robots {
    const isDevelop = false;

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
        sitemap: isDevelop
            ? 'https://dev.api.postexpert.cy/api/v1/site/map'
            : 'https://dev.api.postexpert.cy/api/v1/site/map',
    };
}