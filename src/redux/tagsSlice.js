import { createSlice } from "@reduxjs/toolkit";

const tagsSlice = createSlice({
  name: "tags",
  initialState: {
    allTags:[],
    selectedTag: null,
  },
  reducers: {
    setTags: (state, action) => {
      state.allTags = action.payload
    },
    setSelectedTag:(state, action) => {
      state.selectedTag = action.payload
    }
  },
});

export const { setTags,setSelectedTag } = tagsSlice.actions;
export default tagsSlice.reducer;