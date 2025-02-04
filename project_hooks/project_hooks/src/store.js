import { configureStore } from "@reduxjs/toolkit";
import warningReducer  from "./features/warning/warningSlice.js";

const store = configureStore(
    {reducer: {
        warning: warningReducer
    }}
)

export default store
