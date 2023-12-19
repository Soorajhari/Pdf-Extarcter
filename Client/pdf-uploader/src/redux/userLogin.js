import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    userInfo:JSON.parse(localStorage.getItem("userDetails"))?
    JSON.parse(localStorage.getItem("userDetails")):null,
    success:false,
    error: false,
};

const authLogin =createSlice({
    name: "auth",
    initialState,
    reducers: {
      setLoading: (state, action) => {
        state.loading = action.payload;
        state.userInfo=null
        state.error=false
      },
      signInData: (state, action) => {
        state.loading=false
        state.userInfo = action.payload;
        state.error=false
      //   state.loading = action.payload;
      },
      setError: (state, action) => {
        state.loading=false
        state.userInfo = null;
        state.error=action.payload
      
      },
      logoutSucess: (state, action) => {
        state.loading = null;
        state.userInfo = null;
        state.error = null;
      },
      logoutFauilre: (state, action) => {
        state.loading = null;
        state.userInfo = null;
        state.error = action.payload;
      }
  
    
    },
  })

export const { setLoading, setError, signInData,logoutSucess,logoutFauilre } = authLogin.actions;

export default authLogin.reducer;
