import { setupListeners } from "@reduxjs/toolkit/query"
import { configureStore } from '@reduxjs/toolkit'
import UserSlice from "./Slices/UserSlice";
import FeaturesSlice from './Slices/FeaturesSlice';
import PostsSlice from "./Slices/PostsSlice";
import { apiSlice } from './ApiSlice';
export const Store = configureStore({
    reducer: {
        auth: UserSlice,
        Posts: PostsSlice,
        Features: FeaturesSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});
setupListeners(Store.dispatch)

