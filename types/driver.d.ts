export interface DriverAuthRequest {
  dob: string;
  phone: string;
}

export interface DriverCheckinResponse {
  name: string;
  checkin: string; // timestamp string
}

export interface Driver {
  service_area: string[];
  service_area_id: number[];
  name: string;
  surname: string;
  dob: string; // UTC timestamp
  phone: string;
  email: string;
  gender: string;
  address: {
    district: string;
    subdistrict: string;
    postcode: string;
    lat: string;
    lon: string;
    address1: string;
    province: string;
  };
  id_card: string;
  driver_license_no: string; // 8 digits
  driver_license_exp: string; // UTC timestamp
  model: string;
  vehicle_type: string;
  license_plate: string;
  bank_acc_no: string;
  bank_acc_name: string;
  bank_name: string;
  security_deposit: 0;
  driver_license_image: string; // URI
  id_card_image: string; // URI
  picture_profile: string; // URI
  register_date: string; // UTC timestamp
  status: string;
  distance: number;
  driver_id: string; // uuid
  total_parcel: number;
  valocity: number;
  volume: number;
  nickname: string;
  checkin: string; // UTC timestamp
  address_id: {
    district: number;
    subdistrict: number;
    postcode: number;
    province: number;
  };
  hub_id: number;
  vehicle_type_id: number;
  type: string;
  id: string; // uuid
}
