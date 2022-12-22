import { configureStore } from "@reduxjs/toolkit";
import oompaLoompaSlice from "./slices/oompaLoompaSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, oompaLoompaSlice);

export const store = configureStore({
  reducer: { persistedReducer },
  middleware: [thunk],
});

export const persistor = persistStore(store);
