import { configureStore } from "@reduxjs/toolkit";
import oompaLoompaSlice from "./slices/oompaLoompaSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import oompaLoompasDetailsSlice from "./slices/oompaLoompasDetailsSlice";

const persistConfigList = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
};
const persistConfigDetail = {
  key: "root2",
  storage,
  stateReconciler: autoMergeLevel2,
};

const persistedReducerList = persistReducer(
  persistConfigList,
  oompaLoompaSlice
);
const persistedReducerDetail = persistReducer(
  persistConfigDetail,
  oompaLoompasDetailsSlice
);

export const store = configureStore({
  reducer: { list: persistedReducerList, details: persistedReducerDetail },
  middleware: [thunk],
});

export const persistor = persistStore(store);
