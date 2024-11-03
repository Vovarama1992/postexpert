import {$api} from "@/lib";
import {ResponseData, User} from "@/types";

const getUser = async (token: string) => {
    try {
        return await $api.get<{
            data: User
        }>('/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    } catch (e) {

    }
}

const deleteUser = async () => {

    const {data} = await $api.delete<ResponseData>(`/user`)

    return data
}


export {getUser, deleteUser}