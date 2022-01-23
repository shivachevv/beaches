import { combineReducers, Reducer } from "redux";
import authReducer from "./auth";
import beachesReducer from "./beaches";
import reservationsReducer from "./reservations";
import { RootState } from "../../interfaces";

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  auth: authReducer,
  beaches: beachesReducer,
  reservations: reservationsReducer,
});

export default rootReducer;
