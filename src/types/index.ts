export interface NavItem {
  id: string;
  label: string;
}

export interface ProjectInfo {
  name: string;
  location: string;
  showroom: string;
  developer: string;
  totalUnits: number;
  totalBuildings: number;
  maxFloors: number;
  parkingSpaces: number;
  moveInDate: string;
  phone: string;
  siteArea: string;
  buildingArea: string;
  floorAreaRatio: string;
  buildingCoverageRatio: string;
  structure: string;
  heating: string;
}

export interface UnitType {
  id: string;
  name: string;
  exclusiveArea: number;
  commonArea: number;
  supplyArea: number;
  otherCommonArea: number;
  contractArea: number;
  unitCount: number;
  color: string;
  image: string;
  rooms: number;
  baths: number;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
}

export type GalleryCategory = "all" | "living" | "kitchen" | "bedroom" | "bathroom" | "exterior";

export interface Facility {
  id: string;
  name: string;
  category: FacilityCategory;
  distance: string;
  time: string;
  lat?: number;
  lng?: number;
}

export type FacilityCategory = "transport" | "education" | "convenience" | "medical" | "park";

export interface PremiumItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface BirdEyeTab {
  id: string;
  label: string;
  image: string;
  description: string;
}

export interface CustomerFormData {
  name: string;
  phone: string;
  email?: string;
  privacyConsent: boolean;
  marketingConsent: boolean;
  honeypot?: string;
}
