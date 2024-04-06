import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  updatedStatus: false,
  filePreview: null,
  docInfo: null,
};

const userAvatarInfoSlice = createSlice({
  name: "avtarInfo",
  initialState,
  reducers: {
    getStatus: (state) => {
      state.updatedStatus = true;
    },
    setStatus: (state) => {
      state.updatedStatus = false;
      console.log(state.updatedStatus);
    },

    getFileData: (state, action) => {
      state.updatedStatus = true;
      state.filePreview = action.payload.filePreview;
    },
    getDocData: (state, action) => {
      state.updatedStatus = true;
      state.docInfo = action.payload.docInfo;
    },
    deleteData: (state) => {
      state.filePreview = null;
      state.docInfo = null;
    },
  },
});

export const { getDocData, getStatus, setStatus, getFileData, deleteData } =
  userAvatarInfoSlice.actions;
export default userAvatarInfoSlice.reducer;
