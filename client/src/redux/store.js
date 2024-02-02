import { configureStore } from '@reduxjs/toolkit'
import regSlice from './regSlice.js'
import authSlice from './authSlice.js'

export const store = configureStore({
  reducer: {
    reg: regSlice,
    auth: authSlice
  },
})