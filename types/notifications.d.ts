export interface Notification {
  id: string;
  message: string;
  isRead: boolean;
  imgSrc?: string;
  href?: string; // external link
  path?: string; // in app routing
}
