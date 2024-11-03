import axios from "axios";
import useLocaleStore from "@/store/localeStore";

export interface SuggestionAddressData {
    data: {
        city_with_type: string
        region_with_type: string
        country: string
        settlement_with_type: string
        street_with_type: string
        house: string
        block: string
        block_type_full: string
        flat: string
        postal_code: string
    }
    unrestricted_value: string
    value: string
}

export interface SuggestionProductsData {
    data: {
        class: string
        name_en: string
        name_fr: string
        name_ru: string
        number: string
    }
    unrestricted_value: string
    value: string
}

let url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest";

let token = process.env.NEXT_PUBLIC_DADATA_API;

interface DataServerProps<T> {
    suggestions: T[]
}

const getAddressesByLocality = async (query: string): Promise<DataServerProps<SuggestionAddressData>> => {

    const locale = useLocaleStore.getState().locale;

    const response = await axios.post(url + '/address', {
            query: query,
            "from_bound": {"value": "city"},
            "to_bound": {"value": "city"}
        }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + token,
                'language': locale
            },

        }
    )

    return response.data
}


const getProductsByName = async (query: string): Promise<DataServerProps<SuggestionProductsData>> => {

    const locale = useLocaleStore.getState().locale;

    const response = await axios.post(url + '/mktu', {
            query: query,
        }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + token,
                'language': locale
            },
        }
    )


    return response.data
}

export {getAddressesByLocality, getProductsByName}