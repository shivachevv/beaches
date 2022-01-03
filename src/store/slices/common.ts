import { createSlice } from '@reduxjs/toolkit'
import { CommonState } from '../../interfaces'



export const initialState: CommonState = { // can we extract this object in /utils/constants we have the same object in NavLinksProvider
    navLinks: [
      {
        path: "/",
        name: "Home",
      },
      {
        path: "/beaches",
        name: "Beaches",
      },
      {
        path: "/my-reservations",
        name: "My Reservations",
      },
      {
        path: "/login",
        name: "Login",
      },
    ]
  }


// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
  },
})

export default commonSlice.reducer
