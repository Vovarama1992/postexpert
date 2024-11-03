import React from 'react';
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";
import {authOptions} from "@/app/api/authOptions";
import { $api, __API__, getUser } from "@/lib";
import { StoreProvider } from "@/context";
import { BlogData } from "@/types/landing";
import { redirect } from "@/navigation";
import { ParcelStatuses } from "@/types";
import ClientLoadingWrapper from "@/app/[locale]/dashboard/components/ClientLoadingWrapper";

const Layout = async ({ children, params: { locale } }: { children: React.ReactNode, params: { locale: string } }) => {
    const session: Session | undefined | null = await getServerSession(authOptions as any);

    if (!session) {
        return redirect('/');
    }

    const user = await getUser(session.user.token as string);

    if (!user) {
        return redirect('/');
    }

    if (user.data.data.status === 'inactive') {
        await $api.get('/logout', {
            headers: {
                Authorization: `Bearer ${session.user.token}`
            }
        });
        return redirect('/');
    }

    const response = await fetch(`${__API__}/site/pages/blog?per_page=5&cabinet`, {
        headers: {
            locale
        },

    });

    const responseStatuses = await fetch(`${__API__}/statuses`, {
        headers: {
            locale,
            Authorization: `Bearer ${session.user.token}`
        }
    });

    const { data } = await response.json();
    const { data: dataStatuses } = await responseStatuses.json();

    const blogData = data as BlogData;
    const statuses = dataStatuses as ParcelStatuses[];

    return (
        <StoreProvider statuses={statuses} blogData={blogData} >
            <ClientLoadingWrapper>
                {children}
            </ClientLoadingWrapper>
        </StoreProvider>
    );
};

export default Layout;
