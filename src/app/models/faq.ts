export interface FaqContent {
   category: string;
    title: string;
    content: string;
    orderNumber: number;
    id: number;
    faqFilePath:string;

    
    documentState?:string;
    documentUrl?: string;
}
