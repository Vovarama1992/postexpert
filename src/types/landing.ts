
export interface PageBase {
    title: string,
    description: string,
    content: string
}

// Интерфейс для отдельного FAQ элемента
interface FaqItem {
    question: string;
    answer: string;
}

// Интерфейс для данных пагинации в секции FAQ
interface FaqPagination {
    current_page: number;
    data: FaqItem[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

// Интерфейс для ссылок в пагинации
interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

// Интерфейс для категории FAQ
interface FaqCategory {
    title: string;
    slug: string;
}

// Интерфейс для ссылки в блоке информации
interface BlockLink {
    url: string;
    label: string;
}

// Интерфейс для отдельного блока информации
export interface InfoBlock {
    id: number;
    type: string;
    icon: string;
    title: string;
    description: string;
    link: BlockLink;
}

// Основной интерфейс для всей структуры JSON
export interface FaqData {
    title: string;
    description: string;
    faqs: FaqPagination;
    faqCategories: FaqCategory[];
    blocks: InfoBlock[];
}

export interface BlogPost {
    id: number;
    slug: string;
    title: string;
    text: string;
    content: string;
    image: string;
}

// Интерфейс для данных пагинации в секции блогов
interface BlogPagination {
    current_page: number;
    data: BlogPost[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

// Интерфейс для ссылок в пагинации
interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

// Интерфейс для категории блога
interface BlogCategory {
    title: string;
    slug: string;
}

export interface LastPosts {
    label: string;
    title: string;
    description: string;
    blogPosts: BlogPagination | BlogPost[];
    posts: BlogPost[];
}

export  interface BlogOneData {
    title: string;
    text: string;
    content: string;
    image: string;
    latestPosts: LastPosts;
}

export interface BlogData {
    title: string;
    description: string;
    blogPosts: BlogPagination;
    blogCategories: BlogCategory[];
}
