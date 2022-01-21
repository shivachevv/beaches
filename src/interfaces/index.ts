import { DATABASE_MODELS } from "../utils/enums";

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
  beach: any;
  sets: string | number;
  time: string;
}

export interface ResWithBeach extends ReservationModel {
  beach: BeachModel | undefined;
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
  error: string;
}
export interface ReservationsState {
  myReservations: ReservationModel[] | undefined;
}
export interface CommonState {
  navLinks: NavLink[];
}

export interface RootState {
  auth: AuthState;
  beaches: BeachesState;
  reservations: ReservationsState;
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
  requiresAuth: boolean;
}

export interface Database {
  users: UserModel[];
  // TODO: interface BeachModel
  beaches: BeachModel[];
}

export type DatabaseModel = DATABASE_MODELS.USERS | DATABASE_MODELS.BEACHES;
