'use client';
import React from 'react';
import {BreadcrumbItem, Breadcrumbs} from "@nextui-org/breadcrumbs";
import {HomeIcon} from "@/assets";
import {twMerge} from "tailwind-merge";
import {useRouter} from "@/navigation";

type BreadcrumbsCustomItems = {
    label: string
    href?: string
}

const BreadcrumbsCustom = ({className, items}: {className?: string, items: BreadcrumbsCustomItems[]}) => {

    const router = useRouter()

    const onGoToHome = (e: React.MouseEvent<HTMLLIElement>) => {
        e.preventDefault()
        e.stopPropagation()

        router.push('/')
    }

    const onGoToPage = (e: React.MouseEvent<HTMLLIElement>, href?: string) => {
        e.preventDefault()
        e.stopPropagation()

        if (href) {
            // @ts-ignore
            router.push(href)
        }
    }

    return (
        <Breadcrumbs
            separator="|"
            itemClasses={{
                separator: "px-4 text-white/30 text-[12px] leading-[24px]",
            }}
            classNames={{
            base: twMerge('self-start mt-auto pb-12 max-lg:pb-10 max-sm:pb-6', className),
        }}>
            <BreadcrumbItem  onClick={onGoToHome} >
                <HomeIcon className="text-white/60" />
            </BreadcrumbItem>
            {
                items.map((item) => {
                    return <BreadcrumbItem onClick={e => onGoToPage(e, item.href)} key={item.label} href={item.href} >
                        <span className="text-subtitle-1 text-white">{item.label}</span>
                    </BreadcrumbItem>
                })
            }
        </Breadcrumbs>
    );
};

export default BreadcrumbsCustom;
