export interface MSApiResponse<T = unknown> {
  status: number;
  message: string;
  data?: T;
  resCode?: number; // legacy
}
