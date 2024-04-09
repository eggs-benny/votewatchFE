import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector
} from "react-redux";
import type { ThunkAction } from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import type { Action } from "@reduxjs/toolkit";
import rootReducer from "src/store/rootReducer";
import { persistStore } from "redux-persist";

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export const useDispatch = () => useReduxDispatch<AppDispatch>();

export let persistor = persistStore(store);

export default store;
