import {StepsEnum} from "@/context";

export interface Notification {
    created_at: string
    id: number
    is_read: boolean
    message: string
    parcel_id: string
    parcelNumber: string
    parcel_steps: Record<StepsEnum, boolean> | null,
    title: string
    parcelStatus: string
    updated_at: string
    user_id: number
}
