"use client"
import React from 'react';
import {useUserContext} from "@/context";
import CredentialsCard from "./components/Cards/CredentialsCard";
import MyAddressCard from "./components/Cards/MyAddressCard";
import PasswordCard from "./components/Cards/PasswordCard";
import DeleteUserCard from "./components/Cards/DeleteUserCard";
import useLastNewsStore from "@/store/lastNewsStore";
import LastNews from "@/app/[locale]/components/LastNews";
import {LastPosts} from "@/types/landing";

const Page = () => {

    const {profile} = useUserContext()

    const lastNews = useLastNewsStore(state => state.lastNews)

    return (
        <div className="page-with-slider">
            <div className="cards-body">
                <CredentialsCard/>
                <MyAddressCard empty={!profile?.line1}/>
                <PasswordCard/>
                <DeleteUserCard/>
            </div>
            <hr className="hidden max-xl:block after:my-4 after:w-full after:h-[1px] after:text-gray-200"/>
            <LastNews isDashboard last={lastNews as unknown as LastPosts}/>
        </div>
    );
};

export default Page;
