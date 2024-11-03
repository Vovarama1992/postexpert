export interface FeedbackFields {
    name: string;
    phone: string;
    email: string;
    message: string;
    consent_to_security_policy: string;
}

interface Link {
    url: string;
    label: string;
}

interface Block {
    id: number;
    type: string;
    icon: string;
    title: string;
    description: string;
    link: Link;
}

interface IconType {
    icon: string,
    text: string
}

export interface ContactData {
    description: string;
    form: {
        fields: FeedbackFields
    };
    feedback: {
        label: string;
        address: IconType;
        phone: IconType;
        email: IconType;
        name: IconType;
    }
    title: string;
    blocks: Block[];
}

