import {$api} from "@/lib";
import {Notification, PaginationData} from "@/types";

const getNotifications = async (page: number, parcel_number?: string | null, per_page?: number | null) => {
    const {data} =
        await $api.get<PaginationData<Notification>>('/notifications', {params: {page, per_page: per_page || 5, parcel_number}})

    return Promise.resolve(data)
}

const getNotificationsCount = async () => {
    const {data} =
        await $api.get<number>('/notifications-not-read/count', )

    return Promise.resolve(data)
}

const seeNotification = async (notificationId: number) => {
    const {data} = await $api.put(`/notifications/${notificationId}`, {"read": true})

    return Promise.resolve(data)
}

export {
    getNotifications, seeNotification, getNotificationsCount
}
