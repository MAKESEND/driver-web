export interface Camera {
  id: string;
  label: string;
}

export enum ScannerType {
  pickup = 'pickup',
  dropoff = 'dropoff',
  sorting = 'sorting',
}

export enum ScannerMode {
  single = 'single',
  bulk = 'bulk',
}

export enum FacingMode {
  environment = 'environment',
  user = 'user',
}

export interface ScannedResult {
  text: string;
  scanned_at: string;
}
