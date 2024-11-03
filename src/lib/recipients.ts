import {$api} from "@/lib";
import {PaginationData, RecipientType, RecipientTypeForm, ResponseData} from "@/types";

const addRecipient = async (formValues: RecipientTypeForm) => {

    const {data} = await $api.post<ResponseData>('/recipients', formValues)

    return data
}

const updateRecipient = async (formValues: RecipientTypeForm & { id: number }) => {

    const {data} = await $api.put<ResponseData>(`/recipients/${formValues.id}`, formValues)

    return data
}

const deleteRecipient = async (id: number) => {

    const {data} = await $api.delete<ResponseData>(`/recipients/${id}`)

    return data
}

const getRecipients = async (page: number, name: string | null, per_page?: number) => {

    const {data} = await $api.get<PaginationData<RecipientType>>('/recipients', {params: {page, per_page: per_page ?? 5, name}})

    return Promise.resolve(data)
}

export {addRecipient, getRecipients, updateRecipient, deleteRecipient}