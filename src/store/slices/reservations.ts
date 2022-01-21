import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Reservation } from "../../models/reservation";
import { ReservationsState, ReservationModel } from "../../interfaces";

export const INITIAL_STATE: ReservationsState = {
  myReservations: [],
};

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export const fetchMyReservations = createAsyncThunk(
  "reservations/fetchMyReservations",
  async (userId: string) => {
    const reservations = await Reservation.find({
      key: "userId",
      operator: "==",
      value: userId,
    });

    return reservations;
  }
);

const reservationsSlice = createSlice({
  name: "reservations",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: {
    [fetchMyReservations.fulfilled.toString()]: (
      state: ReservationsState,
      action: PayloadAction<ReservationModel[]>
    ) => {
      state.myReservations = action.payload;
    },
  },
});

// export const {} = reservationsSlice.actions;

export default reservationsSlice.reducer;
