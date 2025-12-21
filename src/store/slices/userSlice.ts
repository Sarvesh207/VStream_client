import { createSlice } from "@reduxjs/toolkit";

interface User {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  coverImage?: string;
}

const initialState: User | null = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      return (state = action.payload);
    },
    removeUser: (state) => {
      return (state = null);
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
