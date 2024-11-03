import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

async function getNextConfig() {
    const withBundleAnalyzer = (await import('@next/bundle-analyzer')).default({
        enabled: process.env.ANALYZE === 'true',
    });

    /** @type {import('next').NextConfig} */
    const nextConfig = {
        env: {
            NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://postexpert.cy',
        },
        productionBrowserSourceMaps: false,
        reactStrictMode: true,
        images: {
            formats: ['image/webp', 'image/avif'],
            remotePatterns: [
                {
                    protocol: 'https',
                    hostname: 'api.postexpert.cy',
                },
                {
                    protocol: 'https',
                    hostname: 'dev.api.postexpert.cy',
                },
                {
                    protocol: 'https',
                    hostname: 'dev.cms.postexpert.cy',
                },
            ],
        }
    };

    return withBundleAnalyzer(withNextIntl(nextConfig));
}

export default getNextConfig();
