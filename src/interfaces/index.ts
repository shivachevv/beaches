import { Roles } from '../utils/enums'

type Role = Roles.ADMIN | Roles.BEACH_ADMIN | Roles.TOURIST

export interface User {
    id:number,
    email:string,
    role: string,
    firstName: string,
    lastName: string
  }


export interface AuthState {
    currentUser: User | undefined,
    isAuthenticated: boolean,
    error: string,
    loading: boolean,
  }

  export interface RootState {
    auth: AuthState
  }

export interface LoginData {
    email: string,
    password: string,
  }