import { createSlice } from "@reduxjs/toolkit";

export const warningSlice = createSlice({
    name: 'warning',
    initialState: {
        value: '---'
    },
    reducers : {
        changeWarning : (state, action) => {
            state.value = action.payload
        }
    }
})

export const {changeWarning} = warningSlice.actions;

export default warningSlice.reducer;
