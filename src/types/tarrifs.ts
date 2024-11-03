interface PriceType {
    price: number
    type: null
    warehouse_id: number
    weight: number
    tariff_id: number
}

export interface TarrifType {
    description: string
    title: string
    id: number
    helper: string
    code: 'regular' | 'express' | 'document'
    deleivery_time: string
    max_weigth: number
    prices: PriceType[]
}

