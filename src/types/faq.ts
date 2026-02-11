export interface FAQCategory {
    id: string;
    name: string;
    order: number;
}

export interface FAQItem {
    id: string;
    categoryId: string;
    question: string;
    answer: string;
    order: number;
    createdAt: string; // ISO string
}

export interface FAQData {
    categories: FAQCategory[];
    questions: FAQItem[];
}
