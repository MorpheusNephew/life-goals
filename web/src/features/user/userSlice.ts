import { createSlice } from '@reduxjs/toolkit';

export interface userState {}

const initialState: userState = {};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export default userSlice.reducer;
