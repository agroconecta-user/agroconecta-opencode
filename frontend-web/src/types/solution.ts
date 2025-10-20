export interface SolutionCardProps {
    id: string;
    title: string;
    category: 'product' | 'service' | 'scientific_article' | 'machinery';
    subcategory?: string;
    priceDollar?: number;
    dataColeta?: string;
}

export interface SolutionDetailsProps {
    id: string;
    title: string;
    category: 'product' | 'service' | 'scientific_article' | 'machinery';
    subcategory?: string;
    details?: string;
    priceDollar?: number;
    link?: string;
    publishDate: string;
    dataColeta?: string;
    starRating?: number;
    ownerContact?: {
        email?: string;
        phone?: string;
        other?: string;
    };
}

export interface CreateSolutionForm {
    title: string
    category: 'product' | 'service' | 'scientific_article' | 'machinery'
    subcategory?: string
    description?: string
    priceDollar?: number
    link?: string
    publishDate: string
    dataColeta?: string
    starRating?: number
    ownerContact?: {
        email?: string
        phone?: string
        other?: string
    }
}
export interface SolutionFromBackend {
  id: string;
  title: string;
  category: 'product' | 'service' | 'scientific_article' | 'machinery';
  subcategory?: string;
  description?: string;
  priceDollar?: number;
  link?: string;
  publishDate: string;
  dataColeta?: string;
  starRating?: number;
  ownerContact?: {
    email?: string;
    phone?: string;
    other?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}