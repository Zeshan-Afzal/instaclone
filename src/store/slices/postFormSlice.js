import { createSlice } from "@reduxjs/toolkit";

const postFormSlice = createSlice({
  name: "postFrom",
  initialState: {
    isOpen: false,
  },
  reducers: {
    open: (state, action) => {
      state.isOpen = true;
      document.body.style.overflow = "hidden";
    },
    close: (state) => {
      state.isOpen = false;
      document.body.style.overflow = "auto";
    },
  },
});

export const { open, close } = postFormSlice.actions;
export default postFormSlice.reducer;
