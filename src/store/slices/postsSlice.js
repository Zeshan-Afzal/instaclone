import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  allPosts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getPosts: (state, action) => {
      state.posts = action.payload;
    },
    getAllPosts: (state, action) => {
      state.allPosts = action.payload;
    },
  },
});

export const { getPosts, getAllPosts } = postsSlice.actions;
export default postsSlice.reducer;
