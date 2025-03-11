import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
    name: "posts",
    initialState: {
      savedPosts:[],
      selectedPost:{}
    } 
    ,
    reducers: {
      setPosts: (state, action) => {
        return action.payload;
      },
      addPost: (state, action) => {
        state.savedPosts.push(action.payload)
      },
      setSelectedPost: (state,action) => {
        state.selectedPost = action.payload;
      }
    },
  });
  
  export const { setPosts, addPost, setSelectedPost } = postsSlice.actions;
  export default postsSlice.reducer;