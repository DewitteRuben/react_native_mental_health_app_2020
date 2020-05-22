import { createStore, combineReducers, applyMiddleware, ReducersMapObject, Reducer } from "redux";
import createSagaMiddleware from "redux-saga";
import { moodReducer } from "./mood/reducer/moodReducer";
import { authReducer } from "./auth/reducer/authReducer";
import { watchOnAuthenticate } from "./auth/sagas/authSagas";
import { all } from "redux-saga/effects";
import { composeWithDevTools } from "redux-devtools-extension";
import { syncTask, watchNewMoodEntries } from "./mood/sagas/moodSagas";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import { AsyncStorage } from "react-native";

const sagaMiddleware = createSagaMiddleware();

const combinedReducers = combineReducers({
  mood: moodReducer,
  auth: authReducer,
});

export type IRootStoreState = ReturnType<typeof combinedReducers>;

const persistConfig: PersistConfig<ReducersMapObject<any, any>, any, any, any> = {
  key: "MOOD_STATE",
  storage: AsyncStorage,
  whitelist: ["mood"],
};

const persistedReducer = persistReducer(persistConfig, combinedReducers as Reducer<any>);
const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
export const persistor = persistStore(store);

function* RootSaga() {
  yield all([watchOnAuthenticate(), watchNewMoodEntries(), syncTask()]);
}

sagaMiddleware.run(RootSaga);

export default store;

