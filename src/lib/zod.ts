import {z, ZodType} from "zod";
import {StepsEnum} from "@/context";

const notEmptyString = z.preprocess(
    (a) => parseInt(a as string, 10),
    z.number().min(0).finite()
)

const CreateStepSchema = (schemas: any): ZodType => {

    const {
        ADDRESS_REQUIRED,
        COUNTRY_REQUIRED,
        RECIPIENT_REQUIRED,
        WAREHOUSE_REQUIRED,
        TARIFF_REQUIRED,
        LOCALITY_REQUIRED,
    } = schemas

    return z
        .object({
            step: z.literal(StepsEnum.created),
            address_id: z.number({
                message: ADDRESS_REQUIRED,
            }).min(1, ADDRESS_REQUIRED),
            country_id: z.number({
                message: COUNTRY_REQUIRED,
            }).min(1, COUNTRY_REQUIRED),
            recipient_id: z.number({
                message: RECIPIENT_REQUIRED,
            }).min(1, RECIPIENT_REQUIRED),
            warehouse_id: z.number({
                message: WAREHOUSE_REQUIRED,
            }).min(1, WAREHOUSE_REQUIRED),
            tariff_id: z.number({
                message: TARIFF_REQUIRED,
            }).min(1, TARIFF_REQUIRED),
            weight: notEmptyString,
            locality: z.string({
                message: LOCALITY_REQUIRED,
            }).min(1, LOCALITY_REQUIRED),
        })
};

const ContentStepSchema = (schemas: any): ZodType => {

    const {
        ADD_PRODUCT
    } = schemas

    return z
        .object({
            step: z.literal(StepsEnum.content),
            products: z.array(z.object({
                id: z.string().or(z.number()),
                title: z.string({
                    message: '',
                }).min(1, ''),
                cost: z.preprocess(
                    (a) => parseInt(a as string, 10),
                    z.number({
                        message: '',
                    }).finite().positive('').max(400, '')
                ),
                quantity: notEmptyString,
            })).min(1, ADD_PRODUCT)
        })
};

const TrackingStepSchema = (schemas: any): ZodType => {

    const {
        TRACKING_REQUIRED,
        WEIGHT_REQUIRED,
        MAX_IMAGE_ITEMS
    } = schemas

    return z
        .object({
            step: z.literal(StepsEnum.tracking),
            tracking_code: z.string().min(2, TRACKING_REQUIRED),
            images: z.array(z.object({
                id: z.string().or(z.number()),
                file: z.any(),
            })).max(2, MAX_IMAGE_ITEMS),
            service_ids: z.array(z.number()),
            sent_weight: z.preprocess(
                (a) => parseInt(a as string, 10),
                z.number({
                    message: WEIGHT_REQUIRED,
                }).min(0).finite()
            )
        })
};


const StepSchema = (schemas: any) => z.discriminatedUnion(
    'step',
    [
        // @ts-ignore
        CreateStepSchema(schemas),
        ContentStepSchema(schemas),
        TrackingStepSchema(schemas)
    ],
);

export {StepSchema}
