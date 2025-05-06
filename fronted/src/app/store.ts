import { configureStore } from "@reduxjs/toolkit";
import competition from '../features/competitions/competitionsStateSlice';
import authAPI from '../features/auth/authAPI';
import authUserReducer from "../features/auth/currentUserSlice";
import competitionDemo from '../features/competitions/competitionsAPI';

const store = configureStore({
  reducer: {
    competition,
    authUser: authUserReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [competitionDemo.reducerPath]: competitionDemo.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authAPI.middleware, competitionDemo.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
