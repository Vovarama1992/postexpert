import {ParcelPaymentStatus, ParcelStatus} from "@/types";
import {ChipVariant} from "@/components/custom";

const getStatusInfo = (status: any, getLabelByCode: (val: string) => string): [ChipVariant, string] => {
    switch (status) {
        case "draft": {
            return ['grayLight', getLabelByCode('DRAFT')]
        }
        case "delivered_to_warehouse": {
            return ['teal', getLabelByCode('DELIVERED')]
        }
        case "delivered_to_recipient": {
            return ['teal', getLabelByCode('DELIVERED')]
        }
        case "sent_to_recipient": {
            return ['amber', getLabelByCode('SENT')]
        }
        case "paid":
        case "confirmed": {
            return ['indigo', getLabelByCode('CONFIRMED')]
        }
        case "canceled": {
            return ['rose', getLabelByCode('CANCELED')]
        }
        default: {
            return ['amber', '']
        }
    }
}

const getStatusPaymentInfo = (status: ParcelPaymentStatus, getLabelByCode: (val: string) => string): [ChipVariant, string] => {
    switch (status) {
        case "pending": {
            return ['amber', 'Ожидает оплаты']
        }
        case "paid": {
            return ['indigo', 'Оплата подтверждена']
        }
        case "canceled": {
            return ['rose', 'Оплата на поступила']
        }
        default: {
            return ['amber', '']
        }
    }
}

export {getStatusInfo, getStatusPaymentInfo}
