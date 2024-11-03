'use client'
import React, {useState} from 'react';
import {useToggleState} from "@/hooks";
import {classNames} from "@/utils";
import {
    BoldEdit2Icon,
    UserSquareIcon,
} from "@/assets";
import {useDropzone} from 'react-dropzone'
import {Avatar} from "@nextui-org/avatar";
import {toast} from "react-toastify";
import ProfileSideOver from "@/components/common/SideOver/ProfileSideOver";
import {useTranslationContext, useUserContext} from "@/context";
import {updateAvatar} from "@/lib";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Button} from "@nextui-org/button";
import {SkeletonWrapper} from "@/components/ui/Skeleton";
import {Card} from "@/components/ui/Card";
import {BlackButton} from "@/components/custom";
import {ListText} from "@/components/ui/ListText";
import {EmailPopover} from "@/components/common/Popover";
import DialogCrop from "@/components/common/Dialogs/DialogCrop";

const CredentialsCard = () => {

    const {locales} = useTranslationContext()

    const queryClient = useQueryClient()
    const {isLoading, profile, avatar} = useUserContext()
    const [image, setImage] = useState<File | null>(null)

    const {isPending: isUpload, mutate: onUpdateAvatar} =
        useMutation({
            mutationFn: updateAvatar,
            onSuccess: () => {
                toast.success(locales.components.CredentialsCard.AVATAR_UPDATED)
                queryClient.invalidateQueries({ queryKey: ['avatar'] })
            }
        })

    const {
        state: show, close, open
    } = useToggleState(false)

    const {
        state: showCrop, close: closeCrop, open: openCrop
    } = useToggleState(false)

    const {getRootProps, getInputProps} = useDropzone({
        maxFiles: 1, multiple: false,
        onDrop: async (acceptedFiles, fileRejections) => {
            if (fileRejections.length) {
                toast.error(fileRejections[0].errors[0].message)
                return
            }
            setImage(acceptedFiles[0])
            openCrop()
        },
        disabled: isUpload,
        useFsAccessApi: false,
        accept: {
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/gif': ['.gif'],
            'image/png': ['.png'],
        },
        minSize: 0,
        maxSize: 1e+6
    }); // здесь добавил валидацию размера фалйа и типа

    const onAcceptCrop = (croppedImage: File) => {
        let formData = new FormData();
        formData.append('avatar', croppedImage);
        onUpdateAvatar(formData)
    }

    const top = <div className="card-top">
        <div >
            <UserSquareIcon/>
            <h6 className="card-title">{locales.components.CredentialsCard.MAIN}</h6>
        </div>
        <Button isIconOnly onClick={open} variant="light">
            <BoldEdit2Icon/>
        </Button>
    </div>

    return (
        <>
            <SkeletonWrapper className="!h-[434px]" ready={!isLoading} type={'profile'}>
                <Card
                    top={top}
                    actions={
                        <BlackButton onClick={open} size="lg" className="!rounded-[12px]" endContent={<BoldEdit2Icon height={16} width={16}/>}>
                            {locales.components.CredentialsCard.EDIT}
                        </BlackButton>
                    }
                >
                    <div className="card-avatar">
                        <Avatar
                            src={avatar ?? ''}
                            name={profile?.full_name ?? ''}
                            className="!size-24 rounded-xl"
                            alt=""
                        />
                        <div className="flex flex-col gap-2 items-start">
                            <BlackButton size="sm" className={classNames("", {'!px-0': !isUpload})} disabled={isUpload} isLoading={isUpload}>
                                <div {...getRootProps()} className="h-full w-full flex items-center px-4">
                                    <input {...getInputProps()} type="file" className="hidden"/>
                                    {locales.components.CredentialsCard.CHANGE}
                                </div>
                            </BlackButton>
                            <span className="text-small-1 text-gray-500">
                                {locales.components.CredentialsCard.IMAGE_UPLOAD_HINT}
                            </span>
                        </div>
                    </div>
                    <div className="mt-6 flex flex-col">
                        <ListText left={locales.components.CredentialsCard.FULL_NAME} right={profile?.full_name} variant="middle"/>
                        <ListText left={locales.components.CredentialsCard.EMAIL} right={<div className="flex items-center gap-2">
                            <span className="text-subtitle-1 text-gray-800 font-medium">{profile?.email ?? '-'}</span>
                            {!profile?.email_verified ? <EmailPopover/> : null}
                        </div>} variant="middle"/>
                        <ListText left={locales.components.CredentialsCard.PHONE} right={profile?.phone} variant="middle"/>
                    </div>
                </Card>
            </SkeletonWrapper>
            <ProfileSideOver isOpen={show} onClose={close}/>
            <DialogCrop cropImage={image} onAccept={onAcceptCrop} isOpen={showCrop} onClose={closeCrop}/>
        </>
    );
};

export default CredentialsCard;
