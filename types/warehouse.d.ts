export interface IWarehouse {
  id: string;
  items: IItem[];
}

export interface IItem {
  id: string;
  warehouseId?: string;
  meta?: any;
}
