import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { userInfo } from "./authTypes";
import { RootState } from '../../app/store';
import { removeCookie } from 'typescript-cookie';

interface AuthState {
  user: userInfo | null;
}

const userFromStorage = typeof window !== 'undefined' && localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser') as string) as userInfo
  : null;

const initialState: AuthState = {
  user: userFromStorage,
};

const authUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<userInfo>) {
      state.user = action.payload;
      localStorage.setItem('currentUser', JSON.stringify(state.user));
    },
    clearUser(state) {
      removeCookie('token');
      localStorage.removeItem('currentUser');
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = authUserSlice.actions;
export const selectCurrentUser = (state: RootState) => state.authUser.user;
export default authUserSlice.reducer;
