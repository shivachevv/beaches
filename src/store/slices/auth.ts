import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, LoginData, User } from "../../interfaces";
import {
  DUMMY_PASSWORD,
  LOCAL_STORAGE_KEY,
  ERROR_MESSAGES,
} from "../../utils/constants";
import type { RootState } from "../../interfaces";
import fakeApi from "../../api/fakeApi";
import { DATABASE_MODELS } from "../../utils/enums";

export const INITIAL_STATE: AuthState = {
  currentUser: undefined,
  isAuthenticated: false,
  error: "",
  loading: true,
};

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    login: (state, { payload }: PayloadAction<LoginData>) => {
      if (payload.password !== DUMMY_PASSWORD) {
        state.error = ERROR_MESSAGES.WRONG_PASSWORD;
        return;
      }
      localStorage.setItem(LOCAL_STORAGE_KEY, payload.email);
      const [loggedUser] = fakeApi.find({
        model: DATABASE_MODELS.USERS,
        queryKey: "email",
        queryValue: payload.email,
      });
      state.currentUser = loggedUser;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      state.currentUser = undefined;
      location.reload();
    },

    setIsAuthenticated: (state) => {
      const isLogged = localStorage.getItem(LOCAL_STORAGE_KEY);
      state.isAuthenticated = !!isLogged;
    },
  },
});

export const { login, logout, setIsAuthenticated } = authSlice.actions;

export default authSlice.reducer;
