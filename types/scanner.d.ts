export interface Camera {
  id: string;
  label: string;
}

export enum ScannerMode {
  pickup = 'pickup',
  dropoff = 'dropoff',
  sorting = 'sorting',
}
