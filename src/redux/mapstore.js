import { configureStore, createSlice } from "@reduxjs/toolkit";

const mapslice = createSlice({
  name: 'mapslice',
  initialState: [],
  reducers: {
    setStructures: (state, action) => {
      localStorage.setItem('structure', action.payload);
      return action.payload;
    },
  }
})

export const { setStructures } = mapslice.actions;


export default configureStore({ reducer: mapslice.reducer });
