//global store
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//import the api key from .env file
const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

export const articleApi = createApi({
    reducerPath: 'articleApi',//give the reducer function
    //here we need to add other points as well like endpoints,basequeries

    //The base query used by each endpoint if no queryFn option is specified.
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', rapidApiKey);
            headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com');

            return headers;
        }
    }),

    //Endpoints are just a set of operations that you want to perform against your server
    //createApi is the core of RTK Query's functionality. 
    //It allows you to define a set of "endpoints" that describe how to retrieve data from backend APIs and other async sources,
    //including the configuration of how to fetch and transform that data. It generates an "API slice" structure that contains 
    //Redux logic (and optionally React hooks) that encapsulate the data fetching and caching process for you.
    endpoints: (builder) => ({
        getSummary: builder.query({
            query: (params) => `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
        })
        //in general due to some special symbols the request and response may not proceed forward,inorder to procees it wee ned to use encodeURIComponent.
    })
})

export const { useLazyGetSummaryQuery } = articleApi
//LAZY is written because we required to fire the api when the url is enter and button is clicked but not at the start
