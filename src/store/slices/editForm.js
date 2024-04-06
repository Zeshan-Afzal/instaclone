import { createSlice } from "@reduxjs/toolkit";

const editFormSlice = createSlice({
  name: "editFrom",
  initialState: {
    isEditOpen: false,
    prevPost: null,
  },
  reducers: {
    openEditForm: (state, action) => {
      console.log("lciked");
      state.isEditOpen = true;
      state.prevPost = action.payload;
      document.body.style.overflow = "hidden";
    },
    closeEditForm: (state) => {
      state.isEditOpen = false;
      document.body.style.overflow = "auto";
    },
  },
});

export const { openEditForm, closeEditForm } = editFormSlice.actions;
export default editFormSlice.reducer;
