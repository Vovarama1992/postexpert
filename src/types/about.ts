// Интерфейс для кнопки с меткой и ссылкой
import {LastPosts} from "@/types/landing";

interface Button {
    label: string;
    link: string;
}

// Интерфейс для поста в блоге
export interface BlogPost {
    id: number;
    slug: string;
    title: string;
    text: string;
    image: string;
    link: {
        label: string;
        url: string;
    }
}

// Интерфейс для секции блога
interface BlogSection {
    label: string;
    description: string;
    button: Button;
    posts: BlogPost[];
}

// Интерфейс для элемента миссии
interface MissionItem {
    value: string;
    title: string;
}

// Интерфейс для секции миссии
interface Mission {
    label: string;
    title: string;
    description: string;
    items: MissionItem[];
}

// Интерфейс для доставки
interface Delivery {
    label: string;
    title: string;
    content: string;
}


// Основной интерфейс для данных
export interface AboutUsData {
    description: string;
    blog: BlogSection;
    mission: Mission;
    delivery: Delivery;
    title: string;
    blocks: any[]; // Для пустого массива
    latestPosts: LastPosts;
}
