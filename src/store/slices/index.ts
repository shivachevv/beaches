import { combineReducers, Reducer } from 'redux'
import authReducer from './auth'
import commonReducer from './common'
import { RootState } from '../../interfaces';

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
    auth: authReducer,
    // common: commonReducer
})

export default rootReducer
