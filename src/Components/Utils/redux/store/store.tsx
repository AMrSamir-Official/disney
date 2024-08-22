import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Correct storage import for redux-persist
import reducer from "../reducer/reducer";

const persistConfig = {
  key: "root",
  storage, // Use the correct storage engine for redux-persist
};

const rootReducer = combineReducers({
  moviesSlice: reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
