export interface UserCoords {
  lat: number;
  lng: number;
}

export interface MapMarker extends UserCoords {
  id: string;
}
