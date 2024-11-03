'use client'
import React from 'react';
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/table";
import {Transition} from "@headlessui/react";
import {getKeyValue} from "@nextui-org/react";
import {useParcelContext, useTranslationContext} from "@/context";
import useParcelStore from "@/store/parcelStore";
import {replaceStringIdsWithNumbers} from '@/utils';
import {useLocale} from "next-intl";

const ParcelTable = ({show}: { show: boolean }) => {

    const {locales} = useTranslationContext()

    const locale = useLocale()

    const createdParcel = useParcelStore(state => state.createdParcel);

    const columns = [
        {
            key: "id",
            label: '#',
        },
        {
            key: "name_ru",
            label: locales.components.ParcelTable.NAME,
        },
        {
            key: "quantity",
            label: locales.components.ParcelTable.QUANTITY,
        },
        {
            key: "cost",
            post: '€',
            label: locales.components.ParcelTable.COST,
        },
    ];

    const {parcel} = useParcelContext();

    // @ts-ignore
    return (
        <Transition show={show} appear={true}>
            <Table color="secondary" classNames={{
                wrapper: '!p-0 !shadow-none',
            }}>
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody
                    items={createdParcel?.products ? replaceStringIdsWithNumbers(createdParcel?.products.map((el: any) => {
                        return {
                            id: el.id,
                            name_ru: el.title,
                            cost: el.cost,
                            quantity: el.quantity,
                        }
                    })) : parcel.items.map((el: any) => {
                        return {
                            id: el.id,
                            name_ru: locale === 'ru' ? el.name_ru : el.name_en,
                            cost: `${el.cost} €`,
                            quantity: el.quantity,
                        }
                    })}>
                    {(item: any) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Transition>
    );
};

export default ParcelTable;
