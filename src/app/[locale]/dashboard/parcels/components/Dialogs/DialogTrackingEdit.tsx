import React, {useEffect} from 'react';
import {ModalContent} from "@nextui-org/react";
import ModalCustom from '@/components/custom/Modal/ModalCustom';
import InputCustom from "@/components/custom/Controls/InputCustom";
import {z} from "zod";
import {useStore} from "@/store/store";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {TickCircleIcon} from "@/assets";
import {useParcelContext} from "@/context";
import {paymentParcel, updateParcel} from "@/lib";
import {toast} from "react-toastify";
import {DialogPreviewType} from "@/components/common/Dialogs/model/dialog";
import {BlackButton} from "@/components/custom";

const DialogTrackingEdit: DialogPreviewType = ({
                                                   isOpen, onClose, ...other
                                               }) => {

    const {parcel, fetchParcel} = useParcelContext();

    const {
        getLabelByCode
    } = useStore()

    const schema = z.object({
        tracking_code: z.string().min(2, getLabelByCode('TRACKING_REQUIRED')),
        sent_weight: z.preprocess(
            (a) => parseInt(a as string, 10),
            z.number({
                message: getLabelByCode('WEIGHT_REQUIRED'),
            }).min(0).finite()
        )
    })

    const methods = useForm<any>({
        defaultValues: {
            tracking_code: '',
            sent_weight: 1
        },
        resolver: zodResolver(schema),
        mode: 'onBlur',
    });

    const {
        handleSubmit, reset, formState: {
            isValid, isSubmitting
        }
    } = methods

    const onSubmit = async (data: any) => {

        const {message} = await updateParcel({
            ...parcel,
            ...data
        })

        toast.success(message)

        await paymentParcel(parcel.id)

        await fetchParcel(String(parcel.id))

        if (onClose) {
            onClose()
        }
    }

    useEffect(() => {
        reset({
            tracking_code: parcel?.tracking_code || '',
            sent_weight: parcel?.sent_weight || ''
        })
    }, [parcel]);

    return (
        <ModalCustom className="px-16 pt-14 !pb-10 max-lg:px-14 max-md:px-10 max-sm:px-6" size="2xl"
                     backdrop={"blur"} isOpen={isOpen} onClose={onClose} {...other}>
            <ModalContent>
                <FormProvider {...methods}>
                    <form className="flex flex-col ">
                        <div className=" side-over-row pb-4">
                            <InputCustom variant="gray" label={getLabelByCode('SET_TRACKING_NUMBER')}
                                         name="tracking_code"/>
                            <InputCustom variant="gray" step={0.1} type="number"
                                         label={getLabelByCode('SET_WEIGHT_PARCEL')}
                                         name="sent_weight"/>
                        </div>
                        <div className="flex    items-center justify-end  pt-4  border-t border-dashed">
                            <BlackButton disabled={!isValid} isLoading={isSubmitting} size="lg"
                                         onClick={handleSubmit(onSubmit)}
                                         className="!rounded-[12px]"
                                         endContent={<TickCircleIcon className="text-white" height={18} width={18}/>}>
                                {getLabelByCode('SAVE')}
                            </BlackButton>
                        </div>
                    </form>
                </FormProvider>
            </ModalContent>
        </ModalCustom>
    );
};

export default DialogTrackingEdit;
