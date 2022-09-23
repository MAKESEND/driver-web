export enum ImageType {
  image = 'image',
  signature = 'signature',
  pickupPOD = 'pickupPOD',
  sorting = 'sorting',
}

export interface ImageUploadRequest {
  orderID?: string; // MS123456789012, required for pickup task
  trackingID?: string; // EX123456789012, required for dropoff task
  type: ImageType;
  PODImage: string[]; // base64 media string
  fileName?: string;
}
