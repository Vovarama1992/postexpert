// Интерфейс для информации о разработчике
interface DevelopedBy {
    name: string;
    url: string;
}

// Интерфейс для социальной сети
interface SocialNetwork {
    id: number;
    code: string;
    name: string;
    url: string;
}

// Интерфейс для футера
export interface FooterData {
    description: string;
    copyright: string;
    developed_by: DevelopedBy;
    socialNetworks: SocialNetwork[];
}

// Основной интерфейс для данных
export interface LayoutData {
    header: any[]; // Массив для возможных данных в будущем
    footer: FooterData;
}