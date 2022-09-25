export enum PickupRound {
  '0' = 0,
  '1' = 1,
  '2' = 2,
  '3' = 3,
  '4' = 4,
  '5' = 5,
  '6' = 6,
  '7' = 7,
  '8' = 8,
}

export enum PlannerRound {
  '1' = 1,
  '2' = 2,
}

export enum DropRound {
  '1' = 1,
  '2' = 2,
}

export enum TempControl {
  '0' = 0,
  '1' = 1,
}

export enum ParcelSize {
  env = 'env',
  s60 = 's60',
  s80 = 's80',
  s100 = 's100',
  s120 = 's120',
  s140 = 's140',
  s160 = 's160',
}

export interface Postal {
  district: number;
  subdistrict: number;
  postcode: number;
  province: number;
}

export enum ParcelStatus {
  sorted = 'Sorted',
  pending = 'Pending',
  delivering = 'Delivering',
}
