// Интерфейс для кнопки с меткой и ссылкой
import {LastPosts} from "@/types/landing";
import {DeliveryInformation} from "@/types/service";

interface Button {
    label: string;
    link: string;
}

// Интерфейс для видео с меткой и URL
interface Video {
    label: string;
    url: string;
}

// Интерфейс для ссылки с меткой и URL
interface Link {
    label: string;
    url: string;
}

// Интерфейс для блока информации
export interface Block {
    id: number;
    type: string;
    icon: string;
    title: string;
    description: string;
    link: Link;
}

// Интерфейс для функций в документальной помощи
interface Feature {
    image: string;
    services: Service[];
}

// Интерфейс для сервисов в документальной помощи
interface Service {
    title: string;
    description: string;
}

// Интерфейс для шагов в документальной помощи
export interface Step {
    title: string;
    description: string;
}

// Интерфейс для шагов
export interface Steps {
    items: Step[];
    button: Button;
    video: Video;
    image: string;
}

// Интерфейс для отзывов
export interface Review {
    text: string;
    name: string;
    delivery: string;
    avatar: string;
}

// Интерфейс для вопроса и ответа
interface FaqItem {
    question: string;
    answer: string;
}

// Интерфейс для блока функций
export interface FeatureBlock {
    id: number;
    type: string;
    title: string;
    description: string;
    annotation: string;
    image: string;
}

// Интерфейс для постов в блоге
interface BlogPost {
    id: number;
    slug: string;
    title: string;
    text: string;
    image: string;
}
interface Hero {
    title: string;
    description: string;
    button: Button;
    video: Video;
    blocks: Block[];
}

// Интерфейс для функций
export interface Features {
    label: string;
    title: string;
    description: string;
    blocks: FeatureBlock[];
}

// Интерфейс для документальной помощи
interface DocumentAssistance {
    label: string;
    title: string;
    description: string;
    features: Feature;
    steps: Steps;
}

// Интерфейс для часто задаваемых вопросов
interface FAQ {
    label: string;
    title: string;
    description: string;
    link: Link;
    items: FaqItem[];
}

// Интерфейс для отзывов
interface Reviews {
    label: string;
    title: string;
    description: string;
    items: Review[];
}

export interface Store {
    label: string,
    title: string,
    description: string,
    images: string[]
}

// Основной интерфейс для данных
export interface MainData {
    hero: Hero;
    delivery_information: DeliveryInformation;
    features: Features;
    document_assistance: DocumentAssistance;
    faq: FAQ;
    reviews: Reviews;
    latestPosts: LastPosts;
    stores: Store;
}
