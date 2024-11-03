import {$api} from "@/lib";
import {PaginationData, Parcel, ParcelItem, ParcelStep} from "@/types";
import {StepsEnum} from "@/context";

const createParcel = async (token: string, locale: string) => {

    try {
        const {data} = await $api.post<{ data: Parcel }>('/parcels', {}, {
            headers: {
                Authorization: `Bearer ${token}`,
                locale
            }
        })

        return Promise.resolve(data)
    } catch (e) {
        // @ts-ignore
        return e.data.message
    }

}

const updateParcel = async (formData: any) => {
    const {data} = await $api.put<{ parcel: Parcel, message: string }>(`/parcels/${formData.id}`, formData)

    return Promise.resolve(data)
}

const deleteParcel = async (id: number) => {
    const {data} = await $api.delete<{ message: string }>(`/parcels/${id}`)

    return Promise.resolve(data)
}

const getParcels = async (page: number, status?: string, number?: string, in_delivering?: boolean) => {
    const {data} = await $api.get<PaginationData<Parcel>>('/parcels', {
        params: {
            status,
            page,
            per_page: 5,
            number,
            in_delivering
        }
    })

    return Promise.resolve(data)
}

const getParcel = async (id: string) => {
    const {data} = await $api.get<{ data: Parcel }>(`/parcels/${id}`)

    return Promise.resolve(data)
}

const getParcelStepsTutorial = async () => {

    const {data} = await $api.get<{ data: ParcelStep[] }>(`/steps-tutorial`)

    return Promise.resolve(data)
}

const getParcelLastDraft = async () => {
    const {data} = await $api.get<{ data: Parcel }>(`/parcels/draft-last`)

    return Promise.resolve(data)
}


const updateParcelSteps = async (id: number, formData: any) => {
    const {data} = await $api.put(`/parcels/${id}/steps`, formData)

    return Promise.resolve(data)
}

const createParcelStepsItems = async (parcelId: number, formData: any) => {
    const {data} = await $api.post(`/parcels/${parcelId}/bulk-items`, formData)

    return Promise.resolve(data)
}

const updateParcelStepsItems = async (parcelId: number, formData: any) => {
    const {data} = await $api.put(`/parcels/${parcelId}/bulk-items`, formData)

    return Promise.resolve(data)
}

const deleteParcelStepsItems = async (parcelId: number, ids: { id: number }[]) => {
    return await $api.delete(`/parcels/${parcelId}/bulk-items`, {
        data: ids
    })
}

const getParcelStepsItems = async (parcelId: number) => {
    const {data} = await $api.get<{ data: ParcelItem[] }>(`/parcels/${parcelId}/items`)

    return Promise.resolve(data)
}

const getParcelDraftCounts = async () => {
    const {data} = await $api.get(`/parcels/draft-count`)

    return Promise.resolve(data)
}

const getParcelSteps = async (id: string | null | undefined) => {
    const {data} = await $api.get<Record<StepsEnum, boolean>>(`/parcels/${id}/steps`)

    return Promise.resolve(data)
}

const getParcelImages = async (id: number) => {
    const {data} = await $api.get<{
        data: {
            src: string;
            name: string;
            id: number
        }[]
    }>(`/parcels/${id}/images`)

    return Promise.resolve(data)
}

const createParcelImage = async (id: number, formData: FormData) => {
    return await $api.post<{
        image: {
            id: number
        }
    }>(`/parcels/${id}/images`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

const deleteParcelImage = async (parcelId: number, imageId: number) => {
    return await $api.delete(`/parcels/${parcelId}/images/${imageId}`)
}


const paymentParcel = async (parcelId: number) => {
    return await $api.get<{ parcel: Parcel }>(`/parcels/${parcelId}/payment`)
}

const paymentParcelOpen = async (parcelId: number, amount: number) => {
    return await $api.post(`/parcels/${parcelId}/payment/open`, {amount})
}

const paymentParcelClose = async (parcelId: number, data: null | any) => {
    return await $api.post(`/parcels/${parcelId}/payment/close`, {
        data
    })
}

export {
    createParcel, updateParcel, getParcels, updateParcelSteps, paymentParcelOpen, paymentParcelClose,
    getParcelStepsItems, deleteParcelStepsItems, createParcelImage, deleteParcelImage, getParcelImages, paymentParcel,
    getParcelSteps, getParcel, updateParcelStepsItems, createParcelStepsItems, getParcelDraftCounts, getParcelLastDraft,
    getParcelStepsTutorial, deleteParcel
}
