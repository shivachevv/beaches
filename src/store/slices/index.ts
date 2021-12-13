import { combineReducers, Reducer } from 'redux'
import authReducer from './auth'
import { RootState } from '../../interfaces';

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
    auth: authReducer
})

export default rootReducer
