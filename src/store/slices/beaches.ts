import { createSlice } from '@reduxjs/toolkit'
import fakeApi from '../../api/fakeApi'
import { BeachesState,  } from '../../interfaces'
import { DatabaseModels } from '../../utils/enums'



export const initialState: BeachesState = {
    beaches:[]
  }


// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

const beachesSlice = createSlice({
  name: 'beaches',
  initialState,
  reducers: {
    setBeaches: (state) => {
        const beaches = fakeApi.findAll({model: DatabaseModels.Beaches})
        state.beaches = beaches
      },
  },
})

export const { setBeaches } = beachesSlice.actions

export default beachesSlice.reducer
