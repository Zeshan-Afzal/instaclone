import { createSlice } from "@reduxjs/toolkit";

const updateFormSlice = createSlice({
  name: "postFrom",
  initialState: {
    isUpdateOpen: false,
  },
  reducers: {
    openUpdate: (state, action) => {
      state.isUpdateOpen = true;
    },
    closeUpdate: (state) => {
      state.isUpdateOpen = false;
    },
  },
});

export const { openUpdate, closeUpdate } = updateFormSlice.actions;
export default updateFormSlice.reducer;
