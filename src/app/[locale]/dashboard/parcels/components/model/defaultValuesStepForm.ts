'use client'
import {v4 as uuidv4} from "uuid";
import {StepsEnum} from "@/context";

const defaultValuesCreateStep = {
    weight: 1,
    address_id: null,
    address: null,
    tariff_id: null,
    tariff: null,
    recipient: null,
    warehouse: null,
    step: StepsEnum.created
}

const defaultValuesContentStep = {
    products: [
        {
            id: uuidv4(),
            title: '',
            cost: '',
            quantity: 1
        }
    ],
    step: StepsEnum.content
}

const defaultValuesTrackingStep = {
    images: [],
    step: StepsEnum.tracking,
    tracking_code: '',
    sent_weight: '',
    service_ids: [],
}

export {defaultValuesCreateStep, defaultValuesContentStep, defaultValuesTrackingStep}
