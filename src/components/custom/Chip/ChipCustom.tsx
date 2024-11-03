import React from 'react';
import {Chip, ChipProps} from "@nextui-org/chip";
import {classNames} from "@/utils";
import {ChipVariant} from "@/components/custom";

const variants = {
    grayLight: ['bg-gray-100', '!text-gray-900 !font-medium'],
    grayMedium: ['bg-gray-300', '!text-gray-800 !font-medium'],
    grayLarge: ['bg-gray-900', '!text-white'],
    amber: ['bg-amber-200', '!text-amber-900 !font-medium'],
    teal: ['bg-teal-300', '!text-teal-900 !font-medium'],
    rose: ['bg-rose-300', '!text-rose-900 !font-medium'],
    indigo: ['bg-indigo-600', '!text-white !font-medium'],
}

interface ChipCustomProps extends Omit<ChipProps, 'variant'> {
    variant: ChipVariant
}

const ChipCustom = ({children, variant, ...other}: ChipCustomProps) => {
    return (
        <Chip color="default" classNames={{
            content: classNames(
                '!p-0',
                {},
                [variants[variant][1]],
            ),
            base: classNames(
                "!h-6 !text-chip bg-gray-100 !rounded-lg px-[9px]",
                {},
                [variants[variant][0], other?.className]
            ),

        }}>
            {children}
        </Chip>
    );
};

export default ChipCustom;
