import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slice/authSlice";
import web3Reducer from "@/redux/slice/web3Slice";
import { persistReducer, persistStore } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";

const rootReducer = combineReducers({
  auth: authReducer,
  web3: web3Reducer,
});

const persistConfig = {
  key: "root",
  storage: sessionStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export default store;
