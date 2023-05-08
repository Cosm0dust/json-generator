import {configureStore} from "@reduxjs/toolkit";
import { savedApi } from "./API/saved.api";
import builderSlice from "./slices/builderSlice";

export const store = configureStore({
    reducer:{
       builder :builderSlice,
        [savedApi.reducerPath]: savedApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(savedApi.middleware),
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>