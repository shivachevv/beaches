import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState, LoginData, User } from '../../interfaces'
import { dummyPassword, localStorageKey, errorMessages } from '../../utils/constants'
import type { RootState } from '../../interfaces'
import fakeApi from '../../api/fakeApi'
import { DatabaseModels } from '../../utils/enums'



export const INITIAL_STATE: AuthState = { // lets use const naming convention, const names should all caps with _ devider -> INITIAL_STATE 
    currentUser: undefined,
    isAuthenticated: false,
    error: '',
    loading: true,
  }


// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    login: (state, { payload }: PayloadAction<LoginData>) => {
      if (payload.password !== dummyPassword) {
        state.error = errorMessages.wrongPassword
        return
      }
      localStorage.setItem(localStorageKey, payload.email)
      const [loggedUser] = fakeApi.find({model: DatabaseModels.Users, queryKey: "email", queryValue:payload.email})
      state.currentUser = loggedUser
      state.isAuthenticated = true
    },

    logout: (state) => {
      localStorage.removeItem(localStorageKey)
      state.currentUser = undefined
      location.reload()
    },

    setIsAuthenticated: (state) => {
      const isLogged = localStorage.getItem(localStorageKey)
      state.isAuthenticated = !!isLogged
    },
  },
})

export const { login, logout, setIsAuthenticated } = authSlice.actions

export default authSlice.reducer
