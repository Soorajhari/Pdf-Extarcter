import {configureStore} from '@reduxjs/toolkit'
import pdfInfo  from './File'
import pdfExtractedData from './Extractedfile'
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'
// import persistReducer from 'redux-persist/es/persistReducer'

const persistConfig={
    key:"root",
    version:1,
    storage
}

const reducer=combineReducers({
    pdfData:pdfInfo,
    extractedData:pdfExtractedData

})

const persistedReducer=persistReducer(persistConfig,reducer)


const store= configureStore({
    reducer: persistedReducer
      
    
})

export default store