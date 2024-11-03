import {AddressType} from "@/types";

export interface CardAddressProps {
    ready?: boolean
    data?: AddressType;
    empty?: boolean
    onOpen: (address?: AddressType) => () => void
}