
declare module "next-auth" {
    interface User {
        authorisation: {
            token: string;
        },
        user: {
            created_at: string
            email: string
            id: number
            name: string
            updated_at: string
            token: string
        }
    }
    interface Session {
        authorisation: {
            token: string;
        },
        user: {
            created_at: string
            email: string
            id: number
            name: string
            updated_at: string
            token: string
        }
    }
}


declare module "next-auth/jwt" {
    interface JWT {
        authorisation: {
            token: string;
        },
        user: {
            created_at: string
            email: string
            id: number
            name: string
            updated_at: string
            token: string
        }
    }
}