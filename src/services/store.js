import { configureStore } from "@reduxjs/toolkit";
import { articleApi } from "./article";

export const store = configureStore({
    reducer: {
        [articleApi.reducerPath]: articleApi.reducer
    },
    //helps to get the specific parts of the variables
    //ie reduces to some part i mean slice of it
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articleApi.middleware)
    //helps us to change the variable before we get it
    // middleware is some code you can put between the framework receiving a request, and the framework generating a response.
})