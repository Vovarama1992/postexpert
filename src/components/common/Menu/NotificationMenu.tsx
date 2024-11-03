'use client';

import React, { useEffect, useRef, useState, MouseEvent } from 'react';
import { classNames } from "@/utils";
import { NotificationIcon } from "@/assets";
import { Badge } from "@nextui-org/badge";
import {getNotifications, getNotificationsCount} from "@/lib";
import { useQuery } from "@tanstack/react-query";
import Pusher from 'pusher-js';
import { useUserContext } from "@/context";
import {Link, useRouter} from "@/navigation";
import { toast } from "react-toastify";

const NotificationMenu = () => {
    const { profile } = useUserContext();
    const pusherRef = useRef<Pusher | null>(null);
    const channelRef = useRef<any>(null);
    const hasNewNotificationRef = useRef(false);
    const [hasNewNotification, setHasNewNotification] = useState(false);
    const router = useRouter();

    const { data: notifications } = useQuery({
        queryKey: ['notifications-count'],
        queryFn: () => getNotificationsCount(),
        staleTime: 5 * 60 * 1000, // Кэширование на 5 минут
        refetchOnWindowFocus: false, // Отключение рефетча при фокусе на окно
    });

    const onGoToNotifications = (e: MouseEvent<HTMLAnchorElement>) => {

        hasNewNotificationRef.current = false;
        setHasNewNotification(false);

        router.push("/dashboard/notifications")
    }

    useEffect(() => {
        if (profile?.user_id && !pusherRef.current) {

            const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string, {
                wsHost: process.env.NEXT_PUBLIC_PUSHER_HOST as string,
                forceTLS: false,
                cluster: process.env.NEXT_PUBLIC_PUSHER_APP_ID as string,
                enabledTransports: ['ws', 'wss'],
            });

            pusherRef.current = pusher;
            const channel = pusher.subscribe(`customer_${profile.user_id}`);
            channelRef.current = channel;

            // Удаляем предыдущий обработчик, если он существует
            channel.unbind('App\\Events\\NotificationEvent');

            // Уникальный идентификатор для предотвращения дублирования Toast уведомлений
            const toastId = 'unique-toast-id';

            channel.bind('App\\Events\\NotificationEvent', (data: any) => {
                try {

                    if (!toast.isActive(toastId)) {

                        setHasNewNotification(true);

                        toast.info(data.notification.body, { toastId });

                        if (data.notification?.action === 'reload') {
                            setTimeout(() => {
                                window.location.reload()
                            }, 3000)
                        }
                    }
                } catch (e) {
                    console.log(e);
                }
            });
        }

        return () => {
            if (channelRef.current) {
                channelRef.current.unbind_all();
                channelRef.current.unsubscribe();
            }
            if (pusherRef.current) {
                pusherRef.current.disconnect();
            }
        };
    }, [profile]);


    useEffect(() => {
        if (notifications) {
            setHasNewNotification(true)
        }
    }, [notifications]);

    return (
        <Badge
            content={
                hasNewNotification ? (
                    <Link className="w-full h-full" href="/dashboard/notifications" onClick={onGoToNotifications}>
                    </Link>
                ) : null
            }
            color="warning"
            variant="solid"
            classNames={{
                badge: hasNewNotification ? 'badge-item' : '',
            }}
            showOutline={false}
        >
            <Link onClick={onGoToNotifications} href="/dashboard/notifications" className={classNames("focus:outline-0")}>
                <NotificationIcon className="text-white" />
            </Link>
        </Badge>
    );
};

export default React.memo(NotificationMenu);