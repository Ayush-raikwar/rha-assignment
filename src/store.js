  
  // store.js
  import { configureStore } from "@reduxjs/toolkit";
  import postsReducer from "./redux/postsSlice";
  import tagsReducer from "./redux/tagsSlice";
  
  const store = configureStore({
    reducer: {
      posts: postsReducer,
      tags:tagsReducer
    },
  });
  
  export default store;