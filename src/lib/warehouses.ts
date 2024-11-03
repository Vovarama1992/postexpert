import {$api} from "@/lib";
import {WarehousesType} from "@/types";

const getWarehouses = async (page: number, name: string | null, per_page?: number) => {

    const {data} = await $api.get<{data: WarehousesType[]}>('/warehouses')

    return Promise.resolve(data)
}


export {getWarehouses}
