export interface AddressType {
    additional_information: string | null
    apartment: string | null
    building: string | null
    country: string | null
    house: string | null
    id: number
    is_default: boolean
    locality: string
    region: string
    street: string
    title: string | null
    user_id: number
    zip_code: string
}

export type AddressTypeForm = Omit<AddressType, 'user' | 'user_id' | 'title' | 'id'> & {additional: boolean}
