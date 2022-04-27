import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newFormData: {},
  allForms: [],
  singleFormData: {},
};

const formSlice = createSlice({
  name: "form",
  initialState: initialState,
  reducers: {
    getNewFormData(state, action) {
      state.newFormData = action.payload.newFormData;
    },
    getForms(state, action) {
      state.allForms = action.payload.allForms;
    },
    getSingleFormDetails(state, action) {
      state.singleFormData = action.payload.singleFormData;
    },
  },
});

export const formSliceReducer = formSlice.reducer;
export const formSliceAction = formSlice.actions;
