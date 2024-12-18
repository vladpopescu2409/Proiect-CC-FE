import { User } from "./user";
export interface NewsletterArticle {
    id: number;
    title: string;
    author: string;
    createdDate: Date;
    content: string;
    coverImageState?: string;
    coverImageUrl?: string | ArrayBuffer | null;
    contentType: string;
    orderNumber: number;
    createdBy: User;
}
