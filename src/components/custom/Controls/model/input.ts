import {InputHTMLAttributes, ReactNode} from "react";
import {AutocompleteProps, InputProps, SelectProps} from "@nextui-org/react";
import {
    getAddresses,
    getAddressesByLocality,
    getCountries, getCountriesForSite,
    getProductsByName,
    getRecipients,
    getWarehouses
} from "@/lib";

export interface InputCustomProps extends Omit<InputProps, 'variant'> {
    name: string;
    label?: string;
    variant?: 'light' | 'gray';
    size?: "md" | "sm" | "lg";
    endContent?: ReactNode;
}

export interface AutocompleteCustomProps extends Omit<AutocompleteProps, 'children'> {
    name: string;
    queryKey: string;
}

export interface SelectCustomProps extends Omit<SelectProps, 'children' | 'variant'> {
    name: string;
    queryKey?: string;
    emptyRow?: ReactNode;
    objectKey?: string;
    variant?: 'light' | 'dark';
    rows?: any[];
    labelKey?: string | ((key: any) => string);
}

export interface CheckBoxCustomProps extends Pick<InputHTMLAttributes<HTMLInputElement>, 'type' | 'required' | 'placeholder' | 'className'> {
    content: ReactNode | string;
    name: string;
    id?: number;
}

const queryFnList = {
    addresses: getAddresses,
    warehouses: getWarehouses,
    countries: getCountries,
    countriesSite: getCountriesForSite,
    recipients: getRecipients,
}

const autocompleteFnList = {
    locality: getAddressesByLocality,
    products: getProductsByName,
}

export {queryFnList, autocompleteFnList}
