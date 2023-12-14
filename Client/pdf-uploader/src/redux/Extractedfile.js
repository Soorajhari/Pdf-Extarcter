import { createSlice } from "@reduxjs/toolkit";
const initialState = {
pdfData:null

};

const ExtarctedFile = createSlice({
  name: "ExtractedData",
  initialState,
  reducers: {
   
    ExtractedData: (state, action) => {
      state.pdfData = action.payload;
    
    },
  },
});

export const { ExtractedData } = ExtarctedFile.actions;

export default ExtarctedFile.reducer;