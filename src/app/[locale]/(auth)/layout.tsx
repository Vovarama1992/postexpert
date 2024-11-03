import React, {ReactNode} from 'react';
import {Session} from "next-auth";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/authOptions";
import {redirect} from "@/navigation";
import Image from "next/image";
import logoMini from "../../../../public/logo/logoMini.svg";
import AuthTabs from "@/app/[locale]/(auth)/components/AuthTabs";
import AuthSocials from "@/app/[locale]/(auth)/components/AuthSocials";
import {AuthTitle} from "@/components/common/Layout";

const Layout = async ({children}: { children: ReactNode }) => {

    const session: Session | undefined | null = await getServerSession(authOptions as any);

    if (session) {
        redirect('/dashboard');
    }

    return (
        <div className="container">
            <div className="mt-16 w-full sm:w-[540px] h-auto sm:h-[714px] p-0 sm:p-10 mx-auto flex flex-col items-center">
                <Image width={44} height={29} unoptimized src={logoMini} alt={'logoMini'}/>
                <AuthTitle/>
                <AuthTabs/>
                {children}
                <AuthSocials/>
            </div>
        </div>
    );
};

export default Layout;
