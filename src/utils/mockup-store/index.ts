import {
  combineReducers,
  configureStore,
  createSlice,
  Reducer,
} from "@reduxjs/toolkit";
import { AuthState } from "../../interfaces";

interface TestState {
  auth: AuthState;
}

export const INITIAL_STATE: AuthState = {
  currentUser: undefined,
  isAuthenticated: false,
  error: "",
  loading: true,
};

const mockupUser = {
  lastName: "Test",
  role: "admin",
  email: "test@abv.bg",
  id: "PdZqze6xwafiVOj16TyZ",
  deposit: 1000,
  firstName: "Test",
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    login: (state) => {
      state.currentUser = mockupUser;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.currentUser = undefined;
      state.isAuthenticated = false;
    },
  },
});

export const { logout, login } = authSlice.actions;

const authReducer = authSlice.reducer;

const rootReducer: Reducer<TestState> = combineReducers<TestState>({
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
