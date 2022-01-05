import { createSlice } from "@reduxjs/toolkit";
import { CommonState } from "../../interfaces";
import { NAV_LINKS } from "../../utils/constants";

export const INITIAL_STATE: CommonState = {
  // can we extract this object in /utils/constants we have the same object in NavLinksProvider
  navLinks: NAV_LINKS,
};

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

const commonSlice = createSlice({
  name: "common",
  initialState: INITIAL_STATE,
  reducers: {},
});

export default commonSlice.reducer;
