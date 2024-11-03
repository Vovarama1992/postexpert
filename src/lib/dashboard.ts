import {$api} from "@/lib";
import {Dashboard} from "@/types";


const getDashboard = async () => {

    const {data} = await $api.get<Dashboard>('/cabinet/pages/main')

    return Promise.resolve(data)
}



export {
    getDashboard
}
