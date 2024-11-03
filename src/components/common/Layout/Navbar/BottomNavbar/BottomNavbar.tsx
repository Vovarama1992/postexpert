'use client';

import React, {memo, MouseEvent, useCallback, useMemo} from 'react';
import {Button} from "@nextui-org/button";
import {PlusIcon} from "@/assets";
import {classNames} from "@/utils";
import {useToggleState} from "@/hooks";
import {Link, usePathname} from "@/navigation";
import {useLocale} from "next-intl";
import BottomNavbarMore from "./BottomNavbarMore";
import {Tooltip} from "@nextui-org/react";
import {confirmCreateDialog} from "@/app/[locale]/dashboard/components/ConfirmCreateDialog";
import {getParcelDraftCounts, getParcelLastDraft} from "@/lib";
import {useQuery} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import {useTranslationContext} from "@/context";
import {HowItWork} from "@/components/common/Tutorial";
import {useQueryState} from "nuqs";

const BottomNavbar = () => {
    const {getLabelByCode} = useTranslationContext();
    const pathname = usePathname();
    const {data: draftCount} = useQuery({
        queryKey: ['draftCount'],
        queryFn: getParcelDraftCounts,
    });
    const [parcelId, setParcelId] = useQueryState('parcelId');

    const {locales, menus} = useTranslationContext();
    const {push} = useRouter();
    const locale = useLocale();

    const {state: show, toggle, close} = useToggleState(false);

    const onClickLink = useCallback(
        (hrefValue: string) => (e: MouseEvent<HTMLButtonElement>) => {

            if (hrefValue.includes('how-it-works')) {
                e.preventDefault();
                toggle();
            }
        },
        [toggle]
    );

    const onClickCreateParcel = useCallback(async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (draftCount) {
            const val = await confirmCreateDialog({});

            if (val === null) return

            if (val) {

                const {data: lastDraft} = await getParcelLastDraft();

                const contentStep = lastDraft?.steps?.created && !lastDraft?.steps?.content && !lastDraft?.steps?.tracking
                const createStep = !lastDraft?.steps?.created && !lastDraft?.steps?.content && !lastDraft?.steps?.tracking
                const trackingStep = lastDraft?.steps?.created && lastDraft?.steps?.content && !lastDraft?.steps?.tracking

                push(`/${locale}/dashboard/parcels/create/${contentStep ? 'second-step' : createStep ? '' : trackingStep ? 'third-step' : 'first'}?parcelId=${lastDraft.id}`);

                return;
            }
        }

        push(`/${locale}/dashboard/parcels/create`)

    }, [draftCount, locale, push, parcelId]);

    const dashboardMenu = useMemo(() => {
        const menu = menus.find(el => el.code === 'dashboard');
        return menu ? menu.items.map(item => {
            const link = locales.data.bottomLinks.find((link: { href: string; }) => link.href === item.slug);

            if (link) {
                item.hrefValue = link.hrefValue;
            }
            return item;
        }) : [];
    }, [menus, locales.data.bottomLinks]);

    return (
        <div className="py-[0.844rem] w-full border-solid border-t-1 border-white/10">
            <div className="flex items-center container justify-between">
                <div className="flex items-center gap-[5px] sm:gap-3 lg:gap-x-[1.125rem] w-full">
                    <Button
                        onClick={onClickCreateParcel}
                        variant="solid"
                        className="bg-blue-400 text-sm text-white font-medium hidden max-md:flex rounded-lg h-[38px] min-w-[44px] md:min-w-20"
                    >
                        {getLabelByCode('CREATE_ORDER')}
                    </Button>
                    {dashboardMenu.map((link: any) => (
                        <Button
                            href={link.slug}
                            key={link.slug}
                            as={Link}
                            color="primary"
                            onClick={onClickLink(link.slug)}
                            size="sm"
                            className={classNames(`text-sm max-sm:!text-[15px] font-medium text-white h-[33px] max-sm:!px-2 hover:!bg-[#25356C]
                                max-md:[&:nth-child(5)]:hidden [&:nth-child(5)]:flex
                                max-lg:[&:nth-child(6)]:hidden [&:nth-child(6)]:flex
                                max-sm:[&:nth-child(2)]:hidden [&:nth-child(2)]:flex
                            `, {
                                'bg-[#25356C]': Array.isArray(link.hrefValue) ? link.hrefValue.includes(pathname) : pathname === link.hrefValue
                            })}
                            variant="light"
                        >
                            {link.name}
                        </Button>
                    ))}
                    <BottomNavbarMore toggle={toggle}/>
                </div>
                <Tooltip classNames={{base: 'block md:hidden'}} placement="bottom-end" showArrow={true}
                         content={getLabelByCode('CREATE_ORDER')}>
                    <Button
                        onClick={onClickCreateParcel}
                        startContent={<PlusIcon height={20} width={20} className="text-white min-w-5 min-h-5"/>}
                        variant="solid"
                        className="bg-blue-400 text-sm text-white font-medium rounded-lg h-[38px] max-md:hidden min-w-[44px] md:!min-w-[190px]"
                    >
                        <span className="hidden md:block">{getLabelByCode('CREATE_ORDER')}</span>
                    </Button>
                </Tooltip>
            </div>
            <HowItWork show={show} close={close}/>
        </div>
    );
};

export default memo(BottomNavbar);
