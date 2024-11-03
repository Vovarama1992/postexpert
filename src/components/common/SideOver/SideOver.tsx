'use client';
import React, { useEffect } from 'react';
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { SideOverProps } from "@/components/common/SideOver/model/sideOver";
import { TickCircleIcon } from "@/assets";
import { Button } from "@nextui-org/button";
import { CloseIcon } from "@nextui-org/shared-icons";
import { useTranslationContext } from "@/context";
import useLenisStore from "@/store/lenisStore";
import {IndigoButton, StrokeButton} from "@/components/custom";

const SideOver = ({
                      isOpen,
                      onClose,
                      title,
                      children,
                      onSubmit,
                      isSubmitting,
                      isValid,
                  }: SideOverProps) => {
    const { locales } = useTranslationContext();

    const startLenis = useLenisStore((state) => state.resumeLenis);
    const stopLenis = useLenisStore((state) => state.pauseLenis);

    const dialogClass = 'relative z-50';
    const overlayClass = 'fixed inset-0 bg-[#24252A] bg-opacity-20 backdrop-blur-sm transition-opacity';
    const panelClass = 'pointer-events-auto w-screen max-w-[62rem]';
    const headerClass = 'py-6 px-10 max-md:px-8 max-sm:px-5 flex justify-between items-start w-full bg-BG';
    const contentClass = 'flex-1 p-10 bg-gray-100 overflow-y-auto flex flex-col gap-y-4 max-md:p-8 max-sm:px-5';
    const footerClass = 'bg-gray-50 py-6 px-10 max-sm:px-5 max-md:px-8 max-md:py-4 flex justify-end items-center border-t border-gray-300 gap-4';

    useEffect(() => {
        if (isOpen) {
            stopLenis(); // Останавливаем Lenis
        } else {
            startLenis(); // Включаем Lenis
        }
    }, [isOpen, stopLenis, startLenis]);

    return (
        <Transition show={isOpen}>
            <Dialog className={dialogClass} onClose={onClose}>
                <TransitionChild
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className={overlayClass} />
                </TransitionChild>

                <div className={`fixed inset-0 overflow-hidden`}>
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                            <TransitionChild
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <DialogPanel className={panelClass}>
                                    <div className="flex h-full flex-col bg-white shadow-xl font-inter">
                                        <div className={headerClass}>
                                            <div className="flex flex-col gap-y-[10.5px] text-white">
                                                <h4 className="font-semibold font-inter text-gray-200">{title}</h4>
                                                <p className="text-sm text-white/80">
                                                    {locales.components.SideOver.DATA_ENCRYPTION_MESSAGE}
                                                </p>
                                            </div>
                                            <Button isIconOnly onClick={onClose} variant="light" className="h-8 min-w-8 !w-8 rounded-md bg-white flex items-center justify-center">
                                                <CloseIcon height={20} width={20} />
                                            </Button>
                                        </div>
                                        <div className={contentClass}>
                                            {children}
                                        </div>
                                        <div className={footerClass}>
                                            <StrokeButton onClick={onClose} color="default" size="sm" className="!rounded-[12px] text-small-3 font-medium" variant="bordered">
                                                {locales.components.SideOver.CANCEL_BUTTON}
                                            </StrokeButton>
                                            <IndigoButton isDisabled={!isValid} isLoading={isSubmitting} onClick={onSubmit} size="sm" endContent={<TickCircleIcon className="text-white" />} className="bg-indigo-600 text-small-3 font-medium text-white" color="primary">
                                                {locales.components.SideOver.SAVE_BUTTON}
                                            </IndigoButton>
                                        </div>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default SideOver;
