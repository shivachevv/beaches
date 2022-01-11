import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { Beach, BeachesState } from "../../interfaces";
import { DATABASE_MODELS } from "../../utils/enums";

export const INITIAL_STATE: BeachesState = {
  beaches: [],
  selectedBeach: null,
};

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export const fetchBeaches = createAsyncThunk(
  "beaches/fetchBeaches",
  async () => {
    const querySnapshot = await db.collection(DATABASE_MODELS.BEACHES).get();

    const beaches = querySnapshot.docs.map((doc: any) => ({
      ...doc.data(),
      firebaseId: doc.id,
    }));
    console.log(beaches);

    return beaches;
  }
);

export const fetchSelectedBeach = createAsyncThunk(
  "auth/fetchSelectedBeach",
  async (id: number) => {
    const querySnapshot = await db
      .collection(DATABASE_MODELS.BEACHES)
      .where("id", "==", id)
      .get();
    const [beach]: Beach[] = querySnapshot.docs.map((doc: any) => ({
      ...doc.data(),
      firebaseId: doc.id,
    }));

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
      action: PayloadAction<Beach[]>
    ) => {
      state.beaches = action.payload;
    },
    [fetchSelectedBeach.fulfilled.toString()]: (
      state: BeachesState,
      action: PayloadAction<Beach>
    ) => {
      state.selectedBeach = action.payload;
    },
  },
});

// export const {} = beachesSlice.actions;

export default beachesSlice.reducer;
