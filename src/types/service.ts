// Интерфейс для кнопки с меткой и ссылкой
import {InfoBlock} from "@/types/landing";
import {Store} from "@/types/main";

interface Button {
    label: string;
    link: string;
}

// Интерфейс для опции тарифа
interface TariffOption {
    name: string;
    value: string;
}

// Интерфейс для тарифа
export interface Tariff {
    name: string;
    price: number;
    options: TariffOption[];
    button: Button;
}

// Интерфейс для тарифов
export interface Tariffs {
    document: Tariff;
    regular: Tariff;
    express: Tariff;
    annotation: string;
    video: string;
}

// Интерфейс для информации о доставке
export interface DeliveryInformation {
    label: string;
    description: string;
    title: string;
    calculator: string;
    tariffs: Tariffs;
    button?: {
        label: string,
        link: string
    },
}

// Интерфейс для других сервисов
interface OtherService {
    title: string;
    description: string;
}

// Интерфейс для секции других сервисов
interface OtherServices {
    label: string;
    services: OtherService[];
    title: string;
    description: string;
    image_other_services: number;
    image: string;
}

// Интерфейс для секции доставки
interface Delivery {
    label: string;
    content: string;
    title: string;
}

// Основной интерфейс для данных
export interface ServicesAndRatesData {
    title: string;
    description: string;
    delivery_information: DeliveryInformation;
    other_services: OtherServices;
    delivery: Delivery;
    blocks: InfoBlock[];
    stores: Store;
    blocks2: InfoBlock[];
}

