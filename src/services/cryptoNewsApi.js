import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

var apiKey = process.env.RAPID_API_KEY;

const cryptoNewsHeaders = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': apiKey
  }

  const baseUrl = 'https://bing-news-search1.p.rapidapi.com'

  const createRequest = (url) => ({ url, headers: cryptoNewsHeaders })
  
  export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({  baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
        })
    })
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;