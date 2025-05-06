import { configureStore } from "@reduxjs/toolkit";
import authAPI from '../features/auth/authAPI';
import currentUserSlice from "../features/auth/currentUserSlice";

const store = configureStore({
  reducer: {
    [authAPI.reducerPath]: authAPI.reducer,
    currentUser: currentUserSlice,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authAPI.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
