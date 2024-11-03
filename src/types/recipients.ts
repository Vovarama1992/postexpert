export interface RecipientType {
    id: number,
    user_id: number,
    phone: string,
    email: string,
    name: string,
    title: string,
    additional_information: string,
    is_default: boolean
}

export type RecipientTypeForm = Omit<RecipientType, 'user_id' | 'title' | 'id'>