'use client';
import React, {memo, useCallback, useMemo, useState} from 'react';
import {GalleryAdd, RoutingIcon} from "@/assets";
import InputCustom from "@/components/custom/Controls/InputCustom";
import {useDropzone} from "react-dropzone";
import {toast} from "react-toastify";
import {useController, useFieldArray} from "react-hook-form";
import Image from "next/image";
import {v4 as uuidv4} from 'uuid';
import {Button} from "@nextui-org/button";
import {classNames} from "@/utils";
import {useParcelContext, useTranslationContext} from "@/context";
import InfoCustom from "@/components/custom/Info/InfoCustom";
import {ParcelCard} from "@/components/ui/Card";

const ParcelTrackingImages = memo(({images, onDelete}: {
    images: { file: File, id: string, url: string }[],
    onDelete: (id: number) => () => void
}) => {
    return images.length ? (
        <div className="flex items-center absolute top-1/2 max-sm:top-auto max-sm:-bottom-2 transform -translate-y-1/2 left-6 gap-2">
            {images.map((item, index) => (
                <div className="size-[78px] border-gray-200 border rounded-xl relative" key={item.id}>
                    <div className="top-2 max-sm:top-1 max-sm:right-1 right-2 absolute">
                        <Button onClick={onDelete(index)} isIconOnly
                                className="!bg-[#242328] !rounded-full !min-w-6 !size-6">
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.96 1L1 6.96" stroke="white" strokeWidth="1.5" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                                <path d="M1 1L6.96 6.96" stroke="white" strokeWidth="1.5" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                            </svg>
                        </Button>
                    </div>
                    <Image
                        width={120}
                        height={120}
                        className="rounded-xl object-cover h-full select-none"
                        src={item.url}
                        alt="image"
                    />
                </div>
            ))}
        </div>
    ) : null;
});

const ParcelTrackingCard = () => {
    const {locales, getLabelByCode} = useTranslationContext();
    const {fields, append, remove} = useFieldArray({name: 'images'});
    const {fieldState: {error}} = useController({name: 'images'});
    const {onSaveImages} = useParcelContext();

    const [isUploading, setIsUploading] = useState(false);

    const onSave = async (data?: any, itemId?: number) => {
        setIsUploading(true);
        try {
            const response = await onSaveImages([data], itemId ? [itemId] : []);
            if (Array.isArray(response) && data) {
                append(
                    {
                        file: data.file,
                        originalId: response[0],
                        id: uuidv4(),
                        url: URL.createObjectURL(data.file),
                    }
                );
            }
        } catch (error) {
            toast.error("Ошибка загрузки файла");
        } finally {
            setIsUploading(false);
        }
    };

    const onDeleteImage = useCallback((index: number) => () => {
        const item = fields[index];
        remove(index);
        // @ts-ignore
        onSave(null, item.originalId);
    }, [remove, fields]);

    const {getRootProps, getInputProps} = useDropzone({
        maxFiles: 2,
        multiple: false,
        onDrop: useCallback((acceptedFiles: any[], fileRejections: any[]) => {
            if (fileRejections.length) {
                toast.error(fileRejections[0].errors[0].message);
                return;
            }
            const newFiles = acceptedFiles.map((file) => ({
                file,
                id: uuidv4(),
                url: URL.createObjectURL(file),
            }));
            onSave(newFiles[0]);
        }, [append]),
        useFsAccessApi: false,
        accept: {
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/gif': ['.gif'],
            'image/png': ['.png'],
        },
        minSize: 0,
        maxSize: 5e+6
    });

    const memoizedFields = useMemo(() => fields.map(field => ({
        ...field,
        // @ts-ignore
        url: URL.createObjectURL(field.file)
    })), [fields]);

    return (
        <ParcelCard id="tracking" right={<InfoCustom className="h-6 w-6" content={getLabelByCode('TRACKING_HELPER')} />} icon={RoutingIcon} title={getLabelByCode('TRACKING_AND_WEIGHT')}>
            <div className="mt-5 side-over-row">
                <InputCustom label={locales.components.ParcelTrackingCard.TRACKING_NUMBER_LABEL} name="tracking_code"/>
                <InputCustom step={0.1} type="number" label={locales.components.ParcelTrackingCard.WEIGHT_LABEL} name="sent_weight"/>
            </div>
            <div className="flex items-start gap-2 mt-4">
                <div className="flex-1">
                    <figure {...getRootProps()} className={classNames(
                        `cursor-pointer flex-1 rounded-[18px] relative bg-gray-50 py-[25px] max-sm:items-start max-sm:h-[250px] h-[166px] border border-dashed flex items-center justify-center gap-3`,
                        {'border-red-500': !!error, 'border-gray-300': !error}
                    )}>
                        {isUploading && <div className="absolute inset-0 bg-gray-100 bg-opacity-80 flex items-center justify-center">
                            <p className="text-gray-700">{getLabelByCode('AWAIT')}...</p>
                        </div>}
                        <ParcelTrackingImages onDelete={onDeleteImage}
                                              images={memoizedFields as unknown as { file: File, id: string, url: string }[]}/>
                        <input disabled={fields.length >= 2 || isUploading} type="hidden" {...getInputProps()} />
                        <div className="flex flex-col items-center gap-3">
                            <GalleryAdd className="h-8 w-8"/>
                            {fields.length < 2 ? (
                                <div className="flex flex-col items-center gap-2">
                                    <p className="text-[14px] text-gray-700 leading-[16px] text-center max-w-[224px]">
                                        {getLabelByCode('TRACKING_TITLE')}
                                    </p>
                                    <p className="text-[12px] text-gray-500 leading-[17px] text-center max-w-[220px]">
                                        {getLabelByCode('TRACKING_SUB_TITLE')}
                                    </p>
                                </div>
                            ) : (
                                <p className="text-[14px] text-gray-700 leading-[16px] text-center max-w-[224px]">{getLabelByCode('TRACKING_MAX')}</p>
                            )}
                        </div>
                    </figure>
                    {error && <p className="text-tiny text-danger">{error.message}</p>}
                </div>
            </div>
        </ParcelCard>
    );
};

export default memo(ParcelTrackingCard);
