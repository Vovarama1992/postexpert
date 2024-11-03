interface ResponseData {
    message: string
    status?: string
}

interface PaginationData<T> {
    data: T[],
    links: {
        first: string,
        last: string,
    },
    meta: {
        current_page: number,
        from: number,
        last_page: number,
        links: {
            url: null | string,
            label: string,
            active: boolean
        }[],
        per_page: number,
        to: number,
        total: number
    }
}

export type {ResponseData, PaginationData}