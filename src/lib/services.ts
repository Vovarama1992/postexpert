import {$api} from "@/lib";
import {ServiceType} from "@/types";

const getServices = async () => {

    const {data} = await $api.get<{data: ServiceType[]}>('/services')

    return Promise.resolve(data)
}


export {getServices}
