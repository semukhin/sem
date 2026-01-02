export interface NewsPost {
    id: string;
    title: string;
    date: string;
    excerpt: string;
    content: string;
    slug: string;
    imageUrl?: string;
    imageUrl2?: string;
    videoUrl?: string;
    externalLink?: string;
    externalLinkTitle?: string;
    externalLinkDescription?: string;
    externalLinkImage?: string;
}

export interface Program {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    order: number;
}
