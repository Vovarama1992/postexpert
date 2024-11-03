import React from 'react';
import {Parcel, ParcelStatuses} from "@/types";
import {useStore} from "@/store/store";
import {useTranslationContext} from "@/context/Translation/TranslationContext";
import {BlogData} from "@/types/landing";
import useLastNewsStore from "@/store/lastNewsStore";
import useStatusStore from "@/store/statusesStore";
import {toast} from "react-toastify";

const StoreProvider = ({
                           children, blogData, statuses
                       }: {
    children: React.ReactNode
    blogData: BlogData
    statuses: ParcelStatuses[]
}) => {

    const {
        locales, getLabelByCode
    } = useTranslationContext()

    useStore.setState({
        locales,
        getLabelByCode
    })

    const setLastNews = useLastNewsStore(state => state.setLastNews)

    const setParcelStatuses = useStatusStore(state => state.setStatuses)

    setLastNews(blogData)

    setParcelStatuses(statuses)

    return children;
};

export default StoreProvider;
