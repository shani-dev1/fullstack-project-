import { configureStore } from "@reduxjs/toolkit";
import competition from '../features/competitions/competitionsStateSlice';
import authAPI from '../features/auth/authAPI';
import authUserReducer from "../features/auth/currentUserSlice";
import competitionsAPI from '../features/competitions/competitionsAPI';
import quiz from '../features/competitions/quiz/quizSlice'
const store = configureStore({
  reducer: {
    quiz,
    competition,
    authUser: authUserReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [competitionsAPI.reducerPath]: competitionsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authAPI.middleware, competitionsAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
