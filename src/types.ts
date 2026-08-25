export type ItemStatus = 'Готов к отгрузке' | 'На хранении' | 'На сборке' | 'Списан';

export interface HistoryEntry {
  time: string;
  event: string;
  user: string;
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  cell: string;
  zone: string;
  status: ItemStatus;
  quantity: number;
  unit: string;
  barcode: string;
  updatedAt: string;
  weightKg: number;
  description?: string;
  history?: HistoryEntry[];
}

export type SortField = 'sku' | 'name' | 'cell' | 'status' | 'quantity';
export type SortOrder = 'asc' | 'desc';
