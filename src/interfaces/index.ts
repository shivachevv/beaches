import { DatabaseModels, Roles } from "../utils/enums";

type Role = Roles.ADMIN | Roles.BEACH_ADMIN | Roles.TOURIST;

export interface User {
  id: number;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
}
export interface Beach {
  id: number;
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
}
export interface CommonState {
  navLinks: NavLink[];
}

export interface RootState {
  auth: AuthState;
  beaches: BeachesState;
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

export type DatabaseModel = DatabaseModels.Users | DatabaseModels.Beaches;
