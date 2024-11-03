import axios from "axios";
import useLocaleStore from "@/store/localeStore";

export interface SuggestionData {
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

interface DataServerProps {
    suggestions: SuggestionData[]
}

const getAddresses = async (query: string): Promise<DataServerProps> => {
    let url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
    let token = process.env.NEXT_PUBLIC_DADATA_API;

    const locale = useLocaleStore.getState().locale;

    let options = {
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token,
            'language': locale
        }
    }

    const response = await axios.post(url, {
        query: query,
    }, options)

    return response.data
}

export {getAddresses}