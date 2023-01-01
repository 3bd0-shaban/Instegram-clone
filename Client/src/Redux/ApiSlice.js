import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, LogOut } from './Slices/UserSlice';
const url = process.env.REACT_APP_API_KEY;

const baseQuery = fetchBaseQuery({
    baseUrl: url,
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true
    },
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {

    let result = await baseQuery(args, api, extraOptions)
    if (result?.error?.originalStatus === 403 || result?.error?.status === 500 || result?.error?.status === 403) {

        // send refresh token to get new access token 
        const refreshResult = await baseQuery('/api/auth/refresh', api, extraOptions)
        if (refreshResult?.data) {
            const user = api.getState().auth.user
            // store the new token 
            api.dispatch(setCredentials({ ...refreshResult.data, user }))
            // retry the original query with new access token 
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(LogOut());
            if (refreshResult?.error?.status === 403) {
                refreshResult.error.data.message = "Your login has expired."
            }
            return refreshResult
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})