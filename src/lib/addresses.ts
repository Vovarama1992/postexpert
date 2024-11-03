import {$api} from "@/lib";
import {AddressType, AddressTypeForm, PaginationData, ResponseData} from "@/types";


const addAddress = async (formValues: AddressTypeForm ) => {

    const {data} = await $api.post<ResponseData>('/addresses', formValues)

    return data
}

const updateAddress = async (formValues: AddressTypeForm & { id: number }) => {

    const {data} = await $api.put<ResponseData>(`/addresses/${formValues.id}`, formValues)

    return data
}

const deleteAddress = async (id: number) => {

    const {data} = await $api.delete<ResponseData>(`/addresses/${id}`)

    return data
}

const getAddresses = async (page: number, locality: string | null, per_page?: number) => {

    const {data} = await $api.get<PaginationData<AddressType>>('/addresses', {params: {page, per_page: per_page ?? 5, locality}})

    return Promise.resolve(data)
}



export {addAddress, updateAddress, deleteAddress, getAddresses}
