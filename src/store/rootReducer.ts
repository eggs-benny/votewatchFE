import { combineReducers } from "@reduxjs/toolkit";
import { reducer as memberReducer } from "src/slices/member";
import { reducer as alertReducer } from "src/slices/alert";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  alert: alertReducer,
  member: memberReducer
});

const persistConfig = {
  key: "root",
  //   blacklist:
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
