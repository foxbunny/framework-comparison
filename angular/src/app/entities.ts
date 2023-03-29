export type Unit = 'kg' | 'l' | 'pc' | 'pair';

export interface Product {
  name: string,
  description: string | null,
  sku: string,
  unit: Unit,
  stock: number,
  price: number,
}

export interface SavedProduct extends Product {
  id: number,
}

export interface ProductHighlight {
  productId: number,
  order: number,
}
