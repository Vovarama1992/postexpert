import {Pathnames} from 'next-intl/navigation';

export const locales = ['en', 'ru'] as const;

export const pathnames = {
    '/': '/',
    '/login': '/login',
    '/register': '/register',
    '/reset': '/reset',
    '/dashboard': '/dashboard',
    '/dashboard/support': '/dashboard/support',
    '/reset-password': '/reset-password',
    '/dashboard/profile': '/dashboard/profile',
    '/dashboard/notifications': '/dashboard/notifications',
    '/dashboard/parcels': '/dashboard/parcels',
    '/dashboard/parcels/create': '/dashboard/parcels/create',
    '/dashboard/parcels/create/second-step': '/dashboard/parcels/create/second-step',
    '/dashboard/parcels/create/third-step': '/dashboard/parcels/create/third-step',
    '/dashboard/parcels/view/[id]': '/dashboard/parcels/view/[id]',
    '/dashboard/delivering': '/dashboard/delivering',
    '/dashboard/cart': '/dashboard/cart',
    '/dashboard/profile/address': '/dashboard/profile/address',
    '/dashboard/profile/recipients': '/dashboard/profile/recipients',
} satisfies Pathnames<typeof locales>;

export type AppPathnames = keyof typeof pathnames;
