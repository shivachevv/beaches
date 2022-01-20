import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Reservation } from "../../models/reservation";
import { ReservationsState, ReservationModel } from "../../interfaces";
import { DATABASE_MODELS } from "../../utils/enums";

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
    console.log(reservations);

    return reservations;
  }
);

// export const fetchSelectedBeach = createAsyncThunk(
//   "auth/fetchSelectedBeach",
//   async (id: string) => {
//     const querySnapshot = await db
//       .collection(DATABASE_MODELS.BEACHES)
//       .where("id", "==", id)
//       .get();
//     const [beach]: BeachModel[] = querySnapshot.docs.map((doc: any) =>
//       doc.data()
//     );

//     return beach;
//   }
// );

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
    // [fetchSelectedBeach.fulfilled.toString()]: (
    //   state: BeachesState,
    //   action: PayloadAction<BeachModel>
    // ) => {
    //   state.selectedBeach = action.payload;
    // },
  },
});

// export const {} = reservationsSlice.actions;

export default reservationsSlice.reducer;
