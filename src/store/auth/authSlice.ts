import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  username: string | null;
  accessToken: string | null;
  isLoggedIn: boolean;  
};

const initialState: AuthState = {
  username: null,
  accessToken: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.isLoggedIn = true;
    },
    logout: () => initialState,
  },
});

export const { setUsername, setAccessToken, logout } = authSlice.actions;

export default authSlice.reducer;
