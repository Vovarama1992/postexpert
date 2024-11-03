interface Dashboard {
    addresses: {
        count: number
    }
    drafts: {
        count: number
    },
    in_delivering: {
        count: number
    }
    notifications: {
        count: number
    }
    parcels: {
        count: number
    }
    recipients: {
        count: number
    }
    user: {
        email: string,
        phone: string
    }
}

export type {Dashboard}
