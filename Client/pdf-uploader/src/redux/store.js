import {configureStore} from '@reduxjs/toolkit'
import pdfInfo  from './File'
import pdfExtractedData from './Extractedfile'
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'
import authReducer from "./userDetails"
import loginDetails from './userLogin'

const persistConfig={
    key:"extractedData",
    version:1,
    storage
}

const extractedDataPersistedReducer = persistReducer(persistConfig, pdfExtractedData)

const reducer=combineReducers({
    pdfData:pdfInfo,
    extractedData:extractedDataPersistedReducer,
    authSlice:authReducer,
    loginData:loginDetails
})

const store= configureStore({
    reducer: reducer
})

export default store
