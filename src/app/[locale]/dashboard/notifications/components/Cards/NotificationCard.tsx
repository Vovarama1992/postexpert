'use client';
import React, {useCallback, useState} from 'react';
import {Link2Icon, NotificationBingIcon} from "@/assets";
import {useTranslationContext} from "@/context";
import {Notification} from "@/types";
import {classNames, convertDate, getStatusInfo} from "@/utils";
import {useRouter} from "@/navigation";
import {seeNotification} from "@/lib";
import _ from "lodash";
import ChipCustom from "@/components/custom/Chip/ChipCustom";
import useStatusStore from "@/store/statusesStore";
import {ListText} from "@/components/ui/ListText";

const NotificationCard = ({ card }: { card: Notification }) => {

    const { locales, getLabelByCode } = useTranslationContext();
    const [isRead, setIsRead] = useState(card.is_read);
    const router = useRouter();
    const statuses = useStatusStore(state => state.statuses)

    const handleSeeNotification = async () => {
        if (!isRead) {
            await seeNotification(card.id);
            setIsRead(true);
        }
    };

    const debouncedSeeNotification = useCallback(_.debounce(handleSeeNotification, 200), [isRead, card.id]);

    const onClickNotification = () => {
        if (card.parcel_id) {
            // @ts-ignore
            router.push(`/dashboard/parcels/view/${card.parcel_id}`);
        }
    };

    return (
        <figure
            onClick={onClickNotification}
            onMouseMove={debouncedSeeNotification}
            className={classNames(
                `border-card lg:px-8 cursor-pointer flex-row transition-all max-sm:gap-4 flex gap-2`,
                {
                    'bg-blue-50 border-blue-300': !isRead,
                    'bg-white border-gray-200': isRead,
                    'hover:shadow-md': !!card.parcel_id,
                }
            )}
        >
            <NotificationBingIcon className={
                isRead ? 'text-gray-800' : 'text-amber-400'
            } width={18} height={21} />
            <div className="flex-1 flex-col flex gap-4 max-sm:gap-2 max-sm:items-start">
                <div className="flex items-center gap-4 max-sm:gap-2 flex-wrap max-sm:flex-col max-sm:items-start">
                    <ListText
                        className="max-sm:flex-col max-sm:items-start"
                        variant="big"
                        left={locales.components.NotificationCard.ORDER}
                        right={card.parcelNumber}
                    />
                    <ListText
                        className="max-sm:flex-col max-sm:items-start"
                        variant="big"
                        left={locales.components.NotificationCard.DATE}
                        right={convertDate(card.created_at, 'DD.MM.YYYY')}
                    />
                </div>
                <p className="text-gray-800 font-medium">
                    {card.title}
                </p>
                <ListText variant="big" left={locales.components.ParcelRowCard.STATUS} right={
                    <ChipCustom variant={getStatusInfo(card.parcelStatus, getLabelByCode)[0]}>{
                        statuses?.find(el => el.code === card?.parcelStatus)?.title
                    }
                    </ChipCustom>
                }/>
            </div>
            {card.parcel_id && <Link2Icon />}
        </figure>
    );
};

export default NotificationCard;
