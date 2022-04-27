import { configureStore } from "@reduxjs/toolkit";
import { formSliceReducer } from "./app/form/form-slice";

const store = configureStore({
  reducer: {
    form: formSliceReducer,
  },
});

export default store;
