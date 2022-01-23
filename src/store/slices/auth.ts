import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AuthState,
  LoginData,
  RegisterData,
  UserAuthResult,
} from "../../interfaces";
import {
  DUMMY_PASSWORD,
  LOCAL_STORAGE_KEY,
  ERROR_MESSAGES,
} from "../../utils/constants";
import { DATABASE_MODELS } from "../../utils/enums";
import { db } from "../../firebase";
import { User } from "../../models/users";

export const INITIAL_STATE: AuthState = {
  currentUser: undefined,
  isAuthenticated: false,
  error: "",
  loading: true,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: LoginData) => {
    const user = await User.find({
      key: "email",
      operator: "==",
      value: email,
    });
    if (!user) {
      return {
        user: undefined,
        error: true,
        errorMessage: ERROR_MESSAGES.INVALID_EMAIL,
      };
    }

    if (password !== DUMMY_PASSWORD) {
      return {
        user: undefined,
        error: true,
        errorMessage: ERROR_MESSAGES.WRONG_PASSWORD,
      };
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, email);
    return { user, error: false };
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, role, firstName, lastName, deposit }: RegisterData) => {
    const newUser = new User({ email, role, firstName, lastName, deposit });
    const createdUser = await newUser.create();
    if (!createdUser) {
      return {
        user: undefined,
        error: true,
        errorMessage: ERROR_MESSAGES.NO_USER_CREATED,
      };
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, email);
    return { createdUser, error: false };
  }
);

export const setCurrentUser = createAsyncThunk(
  "auth/setCurrentUser",
  async () => {
    const email = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!email) {
      return { user: undefined, error: false };
    }
    const querySnapshot = await db
      .collection(DATABASE_MODELS.USERS)
      .where("email", "==", email)
      .get();
    const [user] = querySnapshot.docs.map((doc) => doc.data());

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
        state.error = action.payload.errorMessage;
        return;
      }

      state.currentUser = action.payload.user;
      location.reload();
    },
    [register.fulfilled.toString()]: (
      state: AuthState,
      action: PayloadAction<UserAuthResult>
    ) => {
      if (action.payload.error) {
        state.error = action.payload.errorMessage;
        return;
      }

      state.currentUser = action.payload.user;
      location.reload();
    },
    [setCurrentUser.fulfilled.toString()]: (
      state: AuthState,
      action: PayloadAction<UserAuthResult>
    ) => {
      if (action.payload.error) {
        state.error = ERROR_MESSAGES.NO_USER;
        return;
      }

      state.currentUser = action.payload.user;
    },
  },
});

export const { logout, setIsAuthenticated } = authSlice.actions;

export default authSlice.reducer;
