export interface ServiceType {
    id: number,
    title: string,
    description: string,
    min_price: number | null,
    fixed_price: number | null,
    percentage: string,
    is_published: number,
    created_at: string | null,
    updated_at: string | null
}

