
export enum PricingVariant {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
  G = 'G',
  H = 'H',
  I = 'I',
  J = 'J'
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  image: string;
  currentPrice: number;
  lowest30Price?: number | null;
  firstPrice?: number | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  isBestseller?: boolean;
  isNew?: boolean;
  clubPrice?: number | null;
}

export interface GlobalState {
  isCompact: boolean;
  activeVariant: PricingVariant;
}
