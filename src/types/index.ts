export type NavPage = 'home' | 'shop' | 'fashion' | 'tech' | 'fusion' | 'drunkwatch' | 'teaching-and-research';

export interface ShopItem {
  id: string;
  name: string;
  category: 'footwear' | 'formulations' | 'apparel' | 'hardware';
  collection: string;
  tagline: string;
  description: string;
  price: string;
  numericPrice: number;
  imageUrl: string;
  rating: number;
  reviewsCount: number;
  badge?: string;
  badgeColor?: string;
  inStock: boolean;
  formulationNotes?: string[];
  techSpecs?: string[];
}

export interface GarmentSilhouette {
  id: string;
  title: string;
  tag: string;
  description: string;
  metric: string;
  imageUrl: string;
  price?: string;
  techSpecs: string[];
}

export interface FootwearModel {
  id: 'mountain' | 'beach';
  name: string;
  tag: string;
  headline: string;
  description: string;
  price: string;
  imageUrl: string;
  badgeTitle: string;
  badgeDescription: string;
  features: {
    icon: string;
    title: string;
    description: string;
    colorClass: string;
  }[];
}

export interface ResearchPaper {
  id: string;
  volume: string;
  accessType: string;
  badge?: string;
  journal?: string;
  year?: string;
  title: string;
  authors: string;
  doi: string;
  abstract: string;
  methodology: string;
  findings: string;
}

export interface CourseModule {
  id?: string;
  number: string;
  duration: string;
  title: string;
  description: string;
  tags: string[];
  colorClass: string;
  syllabusHighlights: string[];
}
