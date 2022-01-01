import { combineReducers, Reducer } from 'redux'
import authReducer from './auth'
import commonReducer from './common'
import beachesReducer from './beaches'
import { RootState } from '../../interfaces';

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
    auth: authReducer,
    beaches: beachesReducer,
})

export default rootReducer
