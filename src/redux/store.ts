import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { moodReducer } from "./mood/reducer/moodReducer";
import { authReducer } from "./auth/reducer/authReducer";
import { watchOnAuthenticate } from "./auth/sagas/authSagas";

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  mood: moodReducer,
  auth: authReducer,
});

export type IRootStoreState = ReturnType<typeof reducers>;

const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchOnAuthenticate);

export default store;
