import {$api} from "@/lib";
import {TarrifType} from "@/types";

const getTarrifs = async (warehousId?: number) => {

    const {data} = await $api.get<{
        data: TarrifType[]
    }>( warehousId  ? `/tariffs-warehous/${warehousId}` : `/tariffs`)

    return Promise.resolve(data.data)
}

const getTarrifsForSite = async () => {

    const {data} = await $api.get<{
        data: TarrifType[]
    }>( `/site/tariffs`)

    return Promise.resolve(data.data)
}


export {getTarrifs, getTarrifsForSite}
