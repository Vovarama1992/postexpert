import axios from 'axios';
import {getSession, signOut} from "next-auth/react";
import useLocaleStore from "@/store/localeStore";

const __API__ = process.env.NEXT_PUBLIC_API_URL

const $api = axios.create({
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    baseURL: __API__,
});

$api.interceptors.request.use(async (config) => {

    let session = await getSession();
    const locale = useLocaleStore.getState().locale;

    if (typeof window !== 'undefined') {

        if (config.headers) {

            config.headers['locale'] = locale || 'en';

            if (session) {
                // @ts-ignore
                config.headers.Authorization = `Bearer ${session?.user.token || ''}`;
            }
        }
    }

    return config;
});

$api.interceptors.response.use(response => response, async (error) => {

    if (error.response?.status === 401) {
        if (typeof window !== 'undefined') {
            await signOut({redirect: false})
            window.location.reload()
        }
    }
    return Promise.reject(error.response);
});


export {__API__, $api}
