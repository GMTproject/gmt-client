import { configureStore, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: 'mapslice',
  initialState: [],
  reducers: {
    setStructures: (state, action) => {
      localStorage.setItem('structure', action.payload);
      return action.payload;
    },
  }
})

export const { setStructures } = slice.actions;


export default configureStore({ reducer: slice.reducer });
