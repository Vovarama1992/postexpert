import {$api} from "@/lib";
import {Section, Translation} from "@/types";

const getTranslations = async (locale: string) => {

    const {data} = await $api.get<{data: Translation[]}>('/site/ui-elements', {
        headers: {
            locale
        }
    })

    return Promise.resolve(data.data)
}

const getMenus = async (locale: string) => {

    const {data} = await $api.get<{data: Section[]}>('/site/menus', {
        headers: {
            locale
        }
    })

    return Promise.resolve(data.data)
}

export {getTranslations, getMenus}
