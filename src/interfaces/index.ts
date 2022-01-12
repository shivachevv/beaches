import { DATABASE_MODELS, ROLES } from "../utils/enums";

type Role = ROLES.ADMIN | ROLES.BEACH_ADMIN | ROLES.TOURIST;

export interface User {
  id: number;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  firebaseId: string;
}
export interface Beach {
  id: number;
  firebaseId: string;
  name: string;
  description: string;
  coordinates: Coordinates;
  capacity: number;
  available: number;
  prices: BeachPrices;
  slug: string;
  beachAdminId: number;
  flag: string;
}
export interface ReservationModel {
  userId: string;
  beachId: string;
  sets: string | number;
  time: Date;
}

export interface Coordinates {
  lat: number;
  lng: number;
}
export interface BeachPrices {
  seat: number;
  umbrella: number;
}

export interface AuthState {
  currentUser: User | undefined;
  isAuthenticated: boolean;
  error: string;
  loading: boolean;
}

export interface BeachesState {
  beaches: Beach[] | undefined;
  selectedBeach: Beach | null;
}
export interface CommonState {
  navLinks: NavLink[];
}

export interface RootState {
  auth: AuthState;
  beaches: BeachesState;
}
export interface UserAuthResult {
  user: User | undefined;
  error: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}
export interface NavLink {
  path: string;
  name: string;
}

export interface Database {
  users: User[];
  // TODO: interface Beach
  beaches: Array<any>;
}

export type DatabaseModel = DATABASE_MODELS.USERS | DATABASE_MODELS.BEACHES;
