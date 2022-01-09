import { createSlice } from "@reduxjs/toolkit";
import fakeApi from "../../api/fakeApi";
import { BeachesState } from "../../interfaces";
import { DATABASE_MODELS } from "../../utils/enums";

export const INITIAL_STATE: BeachesState = {
  beaches: [],
};

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

const beachesSlice = createSlice({
  name: "beaches",
  initialState: INITIAL_STATE,
  reducers: {
    setBeaches: (state) => {
      const beaches = fakeApi.findAll({ model: DATABASE_MODELS.BEACHES });
      state.beaches = beaches;
    },
  },
});

export const { setBeaches } = beachesSlice.actions;

export default beachesSlice.reducer;
