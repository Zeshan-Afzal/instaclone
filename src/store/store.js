import { configureStore } from "@reduxjs/toolkit";
import postFormSlice from "./slices/postFormSlice";
import authSlice from "./slices/authSlice";
import updatFormSlice from "./slices/updatFormSlice";
import userAvtarInfoSlice from "./slices/userAvtarInfoSlice";
import postsSlice from "./slices/postsSlice";
import editFormSlice from "./slices/editForm";

const store = configureStore({
  reducer: {
    postForm: postFormSlice,
    auth: authSlice,
    updateForm: updatFormSlice,
    avatarInfo: userAvtarInfoSlice,
    posts: postsSlice,
    editFrom: editFormSlice,
  },
});
export default store;
