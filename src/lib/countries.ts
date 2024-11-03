import {$api} from "@/lib";
import {CountryType} from "@/types";

const getCountries = async (page: number, name: string | null, per_page?: number) => {

    const {data} = await $api.get<{data: CountryType[]}>('/countries')

    return Promise.resolve(data)
}

const getCountriesForSite = async (page: number, name: string | null, per_page?: number) => {

    const {data} = await $api.get<{data: CountryType[]}>('/site/countries')

    return Promise.resolve(data)
}


export {getCountries, getCountriesForSite}
