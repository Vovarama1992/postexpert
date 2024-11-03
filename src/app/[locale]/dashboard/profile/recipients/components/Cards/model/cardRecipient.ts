import {RecipientType} from "@/types";

export interface CardRecipientProps {
    ready?: boolean
    empty?: boolean
    data?: RecipientType,
    onOpen: (address?: RecipientType) => () => void
}