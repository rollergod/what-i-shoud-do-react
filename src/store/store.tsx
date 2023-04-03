import { configureStore } from "@reduxjs/toolkit";
import authSlice from './slices/authSlice';
import postSlice from './slices/postSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        post: postSlice,
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;