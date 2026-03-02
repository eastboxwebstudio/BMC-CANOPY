export enum BookingMode {
  AlaCarte = "Ala Carte",
  Package = "Package",
}

export interface Canopy {
  id: number;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  sizes?: { name: string; price: number }[];
  items?: string[];
  sort_order?: number;
}

export interface Package {
  id: number;
  name: string;
  price: number;
  description?: string;
  items: string[];
  sort_order?: number;
}

export interface Accessory {
  id: number;
  name: string;
  price: number;
  image_url?: string;
  category: string;
  sort_order?: number;
}

export interface Color {
  name: string;
  hex: string;
}
