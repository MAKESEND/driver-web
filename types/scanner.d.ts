export interface Camera {
  id: string;
  label: string;
}

export interface ScannerConfig {
  task: keyof typeof ScannerTask;
  mode: keyof typeof ScannerMode;
}

export enum ScannerTask {
  scan = 'scan',
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
  scanned_at: number;
}
