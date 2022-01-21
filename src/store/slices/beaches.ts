import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BeachModel, BeachesState } from "../../interfaces";
import { Beach } from "../../models/beaches";

export const INITIAL_STATE: BeachesState = {
  beaches: [],
  selectedBeach: null,
  error: "",
};

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export const fetchBeaches = createAsyncThunk(
  "beaches/fetchBeaches",
  async () => {
    const beaches = await Beach.findAll();

    return beaches;
  }
);

export const fetchSelectedBeach = createAsyncThunk(
  "auth/fetchSelectedBeach",
  async (id: string) => {
    const [beach] = await Beach.find({
      key: "id",
      operator: "==",
      value: id,
    });

    return beach;
  }
);

const beachesSlice = createSlice({
  name: "beaches",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: {
    [fetchBeaches.fulfilled.toString()]: (
      state: BeachesState,
      action: PayloadAction<BeachModel[]>
    ) => {
      state.beaches = action.payload;
    },
    [fetchSelectedBeach.fulfilled.toString()]: (
      state: BeachesState,
      action: PayloadAction<BeachModel>
    ) => {
      state.selectedBeach = action.payload;
    },
  },
});

// export const {} = beachesSlice.actions;

export default beachesSlice.reducer;
