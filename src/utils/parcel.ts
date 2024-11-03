import {Parcel, ServiceType, TarrifType} from "@/types";

function calculatePercentage(percentage: number, total: number) {
    return (percentage / 100) * total;
}

const getPrice = (getWeight: string | number, tariff: TarrifType | null, parcel: Parcel) => {
    const weight = Number(getWeight);

    const find = tariff?.prices.find(el => el.weight === Math.ceil(weight) && el.tariff_id === tariff?.id);

    if (find) {
        return find.price;
    }

    if (parcel.price) return parcel.price

    if (parcel?.tariff) {
        const find = parcel?.tariff.prices.find(el => el.weight === Math.ceil(Number(parcel.weight)) && el.tariff_id === parcel?.tariff?.id);

        if (find) {
            return find.price;
        }
    }

    return 0;
}

const getInsuranceValue = (service_ids: any[], parcel: Parcel | null, price: number, services?: {
    data: ServiceType[]
}) => {
    let insurance = 0;

    const servicesArray = service_ids?.length ? service_ids : parcel?.service_ids;

    for (let i = 0; i < servicesArray!.length; i++) {
        if (servicesArray) {
            const service = services?.data?.find(el => el.id === servicesArray[i]);
            if (service && service.min_price) {
                insurance += calculatePercentage(Number(service.percentage), price) > service.min_price ? calculatePercentage(Number(service.percentage), price) : service.min_price;
            }
        }
    }

    if (insurance) {
        return insurance;
    }

    return 0;
}


export {getPrice, getInsuranceValue}