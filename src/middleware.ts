import createMiddleware from 'next-intl/middleware';
import {NextRequest} from "next/server";
import {withAuth} from "next-auth/middleware";

const internationalizationMiddleware = createMiddleware({
    locales: ['en', 'ru'],
    defaultLocale: 'ru',
});

const authMiddleware = withAuth(
    function onSuccess(req) {
        return internationalizationMiddleware(req);
    },
    {
        callbacks: {
            authorized: ({token}) => token != null
        },
        secret: process.env.NEXT_PUBLIC_SECRET,
        pages: {
            signIn: '/ru/login'
        }
    }
);

export async function middleware(req: NextRequest) {
    const isPublicPage = !req.nextUrl.pathname.includes('/dashboard');

    if (isPublicPage) {
        return internationalizationMiddleware(req);
    } else {
        return (authMiddleware as any)(req);
    }
}

export const config = {
    matcher: ['/',
        '/(ru|en)/:path*']
};
