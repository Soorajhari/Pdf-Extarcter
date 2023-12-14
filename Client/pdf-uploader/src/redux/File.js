import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  loading: false,
  pdfInfo: {
    id:"",
    fieldname: "",
    originalname: "",
    encoding: "",
    mimetype: "",
    destination: "",
    filename: "",
    path: "",
    size:0,
  },
 

  error: false,

};

const authSlice = createSlice({
  name: "Data",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    
    },
    pdfData: (state, action) => {
      state.pdfInfo = action.payload;
    
    },
  },
});

export const { setLoading, setError, pdfData } = authSlice.actions;

export default authSlice.reducer;