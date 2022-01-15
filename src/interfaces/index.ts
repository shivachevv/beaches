import { DATABASE_MODELS, ROLES } from "../utils/enums";
import { renderToString } from "react-dom/server";

type Role = ROLES.ADMIN | ROLES.BEACH_ADMIN | ROLES.TOURIST;

export interface UserModel {
  id: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  deposit: number;
}
export interface RegisterData {
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  deposit: number;
}
export interface BeachModel {
  id: string;
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
  id: string;
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
  currentUser: UserModel | undefined;
  isAuthenticated: boolean;
  error: string;
  loading: boolean;
}

export interface BeachesState {
  beaches: BeachModel[] | undefined;
  selectedBeach: BeachModel | null;
}
export interface CommonState {
  navLinks: NavLink[];
}

export interface RootState {
  auth: AuthState;
  beaches: BeachesState;
}
export interface UserAuthResult {
  user: UserModel | undefined;
  error: boolean;
  errorMessage: string;
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
  users: UserModel[];
  // TODO: interface BeachModel
  beaches: BeachModel[];
}

export type DatabaseModel = DATABASE_MODELS.USERS | DATABASE_MODELS.BEACHES;
