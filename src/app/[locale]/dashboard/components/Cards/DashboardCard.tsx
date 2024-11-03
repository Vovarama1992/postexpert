import React, {ReactNode} from 'react';
import {classNames} from "@/utils";
import {Link} from "@/navigation";
import {twMerge} from "tailwind-merge";

interface CardDashboardProps {
    left: ReactNode;
    bottom?: ReactNode;
    href?: string;
    variant: 'blue' | 'white' | 'gray';
    centerClass?: string;
    bottomClass?: string;
    className?: string;
    title: string | ReactNode;
    subTitle: string | ReactNode;
}

const DashboardCard = ({left, variant, title, bottomClass, subTitle, centerClass, bottom, href, className}: CardDashboardProps) => {

    const backgroundColor = variant === 'blue' ? 'bg-blue-100'
        : variant === 'gray' ? 'bg-gray-100' : 'bg-white'

    return (
        <Link
            // @ts-ignore
            href={href ?? '/'} className={
            twMerge(
                classNames(
                    "flex flex-col p-4 cursor-pointer rounded-2xl relative hover:shadow-md transition-shadow",
                    {
                        'outline-1 outline outline-gray-300': variant === 'white'
                    },
                    [backgroundColor]
                ), className
            )
        }>
            <div className={
                classNames(
                    "pt-2 pb-8 flex items-center px-4 gap-4",
                    {

                    },
                    [centerClass]
                )
            }>
                {left}
                <div className="flex flex-col gap-2">
                    <h6 className="text-subtitle-2 font-semibold">{title}</h6>
                    <span className="text-gray-600 text-small-5">{subTitle}</span>
                </div>
            </div>
            {bottom ? <div className={
                classNames("pt-4 border-t border-solid border-gray-300 flex items-center mx-4 gap-x-4", {

                }, [bottomClass])
            }>
                {bottom}
            </div> : null}
        </Link>
    );
};

export default DashboardCard;
