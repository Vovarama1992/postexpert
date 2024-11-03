'use client'
import React from 'react';
import {useToggleState} from "@/hooks";
import {classNames} from "@/utils";
import {
    AddCircleIcon,
    BoldEdit2Icon,
    LocationIcon,
} from "@/assets";
import {CardAddressProps} from "./model/cardMyAddress";
import {Button} from "@nextui-org/button";
import {useTranslationContext, useUserContext} from "@/context";
import InfoCustom from "@/components/custom/Info/InfoCustom";
import {ListText} from "@/components/ui/ListText";
import {SkeletonWrapper} from "@/components/ui/Skeleton";
import {Card} from "@/components/ui/Card";
import {MyAddressSideOver} from "@/components/common/SideOver";
import {BlackButton} from "@/components/custom";

const MyAddressCard = ({ready = true, empty}: CardAddressProps) => {

    const {locales, getLabelByCode} = useTranslationContext()
    const {state: show, close, open} = useToggleState(false);
    const {profile} = useUserContext();

    const actions = empty ? null : (
        <div className="flex items-center gap-4">
            <BlackButton onClick={open} size="lg" className="!rounded-[12px]"
                         endContent={<BoldEdit2Icon height={16} width={16}/>}>
                {locales.components.MyAddressCard.EDIT}
            </BlackButton>
        </div>
    );

    const renderTop = () => {
        return (
            <div className="card-top">
                <div >
                    <LocationIcon className="max-sm:h-[18px] max-sm:w-[18px]" width={24} height={24}/>
                    <div className="flex items-center gap-2">
                        <h6 className="card-title">
                            {locales.components.MyAddressCard.SENDER_ADDRESS}
                        </h6>
                        <InfoCustom content={getLabelByCode('SENDER_HELPER')}/>
                        {/*<InfoFillIcon className="text-amber-400"/>*/}
                    </div>
                </div>
                <Button isIconOnly onClick={open} variant="light">
                    {empty ? <AddCircleIcon height={32} width={32} className="text-indigo-600"/> : <BoldEdit2Icon/>}
                </Button>
            </div>
        );
    };

    return (
        <>
            <div className="card-row">
                <SkeletonWrapper ready={ready} type={'address'}>
                    <Card top={renderTop()} actions={actions} mainClassName={classNames('', {'pb-6': empty})}>
                        {!empty && (
                            <div className="flex flex-col mt-6 ">
                                <ListText className="!items-start" left={locales.components.MyAddressCard.ADDRESS}
                                          right={profile?.line1} variant="middle"/>
                                <ListText left={locales.components.MyAddressCard.ZIP_CODE} right={profile?.zip_code}
                                          variant="middle"/>
                            </div>
                        )}
                    </Card>
                </SkeletonWrapper>
            </div>
            <MyAddressSideOver isOpen={show} onClose={close}/>
        </>
    );
};

export default MyAddressCard;
