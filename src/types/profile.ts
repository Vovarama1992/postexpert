
export interface Profile {
    additional_information: string | null
    email: string | null
    email_verified: boolean
    full_name: string | null
    id: number
    line1: string | null
    phone: string | null
    user_id: number
    zip_code: string | null
}

export type ProfileForm = Pick<Profile, 'email' | 'phone' | 'additional_information' | 'full_name'>

export type MyAddressForm = Pick<Profile, 'line1' | 'zip_code' | 'additional_information'> & {additional: boolean}
