import {WarehousesType} from "@/types/warehouses";
import {TarrifType} from "@/types/tarrifs";
import {RecipientType} from "@/types/recipients";
import {CountryType} from "@/types/countries";
import {AddressType} from "@/types/address";
import {StepsEnum} from "@/context";

interface Payment {
    amount: number
    data: {id: string, status: string}
    id: number
    parcel_id: number
    started_at: string
    status: string
    user_id: number
}

export interface Parcel {
    address_id: null | number
    address: AddressType
    country_id: null | number
    country: CountryType
    created_at: string
    id: number
    steps: Record<StepsEnum, boolean>
    locality: null | number
    price: null | number
    recipient: RecipientType
    recipient_id: null | number
    sent_weight: null | number
    status: null | ParcelStatus
    payment: Payment | null
    tariff: TarrifType
    tariff_id: null | number
    title: string
    tracking_code: null | string
    user_id: number
    warehouse_id: null | number
    warehouse?: WarehousesType
    weight: null | number
    service_ids: number[]
    items: ParcelItem[]
}

export interface ParcelStep {
    step: number
    title: string
    selector: string
    description: string
}

export interface ParcelStatuses {
    title: string;
    code: string
    id: number
}

export type ParcelStatus = 'draft' | 'confirmed' | 'canceled' | 'delivered_to_warehouse' | 'sent_to_recipient' | 'delivered_to_recipient'
export type ParcelPaymentStatus = 'pending' | 'paid' | 'canceled'

export interface ParcelItem {
    name_ru: string
    name_en: string
    cost: number
    quantity: number
    id: number
}
