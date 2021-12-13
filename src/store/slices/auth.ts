import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState, LoginData, User } from '../../interfaces'
import { dummyPassword, localStorageKey, errorMessages } from '../../utils/constants'
import type { RootState } from '../../interfaces'
import db from '../../db/db.json'



export const initialState: AuthState = {
    currentUser: undefined,
    isAuthenticated: false,
    error: '',
    loading: true,
  }


// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<LoginData>) => {
      if (payload.password !== dummyPassword) {
        state.error = errorMessages.wrongPassword
        return
      }
      localStorage.setItem(localStorageKey, payload.email)
      const users:User[] = db.users
      const loggedUser = users.find(user => user.email === payload.email)
      state.currentUser = loggedUser
    },

    logout: (state) => {
      localStorage.removeItem(localStorageKey)
      state.currentUser = undefined
      location.reload()
    },
  },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
