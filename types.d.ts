export interface NearbyResults {
  data: Data;
}

export interface Data {
  html_attributions: any[];
  next_page_token: string;
  results: Result[];
  status: string;
}

export interface Result {
  business_status: BusinessStatus;
  geometry: Geometry;
  icon: string;
  icon_background_color: IconBackgroundColor;
  icon_mask_base_uri: string;
  name: string;
  opening_hours?: OpeningHours;
  photos?: Photo[];
  place_id: string;
  plus_code?: PlusCode;
  rating?: number;
  reference: string;
  scope: Scope;
  types: Type[];
  user_ratings_total?: number;
  vicinity: string;
}

export enum BusinessStatus {
  Operational = "OPERATIONAL",
}

export interface Geometry {
  location: Location;
  viewport: Viewport;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Viewport {
  northeast: Location;
  southwest: Location;
}

export enum IconBackgroundColor {
  The909Ce1 = "#909CE1",
}

export interface OpeningHours {
  open_now: boolean;
}

export interface Photo {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
}

export interface PlusCode {
  compound_code: string;
  global_code: string;
}

export enum Scope {
  Google = "GOOGLE",
}

export enum Type {
  Establishment = "establishment",
  GasStation = "gas_station",
  PointOfInterest = "point_of_interest",
}
