import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { userInfo } from "./authTypes";
import { RootState } from '../../app/store';
import { removeCookie } from 'typescript-cookie';

interface AuthState {
  user: userInfo | null;
}

const initialState: AuthState = {
  user: null,
};

const authUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<userInfo>) {
      state.user = action.payload;
    },
    clearUser(state) {
      removeCookie('token');
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = authUserSlice.actions;
export const selectCurrentUser = (state: RootState) => state.authUser.user;
export default authUserSlice.reducer;
