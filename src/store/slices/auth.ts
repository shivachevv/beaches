import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, LoginData, User, UserAuthResult } from "../../interfaces";
import {
  DUMMY_PASSWORD,
  LOCAL_STORAGE_KEY,
  ERROR_MESSAGES,
} from "../../utils/constants";
import type { RootState } from "../../interfaces";
import { DATABASE_MODELS } from "../../utils/enums";
import { db } from "../../firebase";

export const INITIAL_STATE: AuthState = {
  currentUser: undefined,
  isAuthenticated: false,
  error: "",
  loading: true,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: LoginData) => {
    if (password !== DUMMY_PASSWORD) {
      return { user: undefined, error: true };
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, email);
    const querySnapshot = await db
      .collection(DATABASE_MODELS.USERS)
      .where("email", "==", email)
      .get();
    const [user] = querySnapshot.docs.map((doc: any) => doc.data());

    return { user, error: false };
  }
);

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
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
  extraReducers: {
    [login.fulfilled.toString()]: (
      state: AuthState,
      action: PayloadAction<UserAuthResult>
    ) => {
      if (action.payload.error) {
        state.error = ERROR_MESSAGES.WRONG_PASSWORD;
        return;
      }

      state.currentUser = action.payload.user;
    },
  },
});

export const { logout, setIsAuthenticated } = authSlice.actions;

export default authSlice.reducer;
