import { LogOut, setCredentials } from '../Slices/UserSlice';
import { apiSlice } from '../ApiSlice';
export const AuthApi = apiSlice.injectEndpoints({
    endpoints: builder => ({

        birthday: builder.mutation({
            query: ({ data, email }) => ({
                url: `/api/auth/birthday?email=${email}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Auth'],
        }),
        signin: builder.mutation({
            query: (data) => ({
                url: '/api/auth/signin',
                method: 'POST',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['Auth'],
        }),
        signup: builder.mutation({
            query: (data) => ({
                url: '/api/auth/signup',
                method: 'POST',
                // credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['Auth'],
        }),
        logOut: builder.mutation({
            query: () => ({
                url: '/api/auth/logout',
                method: 'POST',
                credentials: 'include',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    dispatch(LogOut())
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000)
                } catch (err) {
                    console.log(err)
                }
            },
            invalidatesTags: ['Auth'],
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/api/auth/refresh',
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { accessToken } = data
                    dispatch(setCredentials({ accessToken }))
                } catch (err) {
                    console.log(err)
                }
            },
            invalidatesTags: ['Auth'],
        }),
        VerifyEmail: builder.mutation({
            query: ({ email, code }) => ({
                url: `/api/auth/activateEmail?email=${email}&code=${code}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Auth'],
        }),
        ChangePassword: builder.mutation({
            query: (data) => ({
                url: `/api/auth/changepassword`,
                method: 'PUT',
                body:data
            }),
            invalidatesTags: ['Auth'],
        }),
        VerifyEmailtoResest: builder.mutation({
            query: ({ email, code }) => ({
                url: `/api/auth/verifyOtp?email=${email}&code=${code}`,
                method: 'GET',
            }),
            invalidatesTags: ['Auth'],
        }),
        RequestOTP2: builder.mutation({
            query: (data) => ({
                url: '/api/auth/request2otpactivate',
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Auth'],
        }),
        ForgetPassword: builder.mutation({
            query: (email) => ({
                url: `/api/auth/generateOtp?email=${email}&code=`,
                method: 'GET',
                // body: data
            }),
            invalidatesTags: ['Auth'],
        }),
        ResetPassword: builder.mutation({
            query: (data) => ({
                url: '/api/auth/resetpassword',
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Auth'],
        }),
    }),
});
export const {
    useBirthdayMutation,
    useLogOutMutation,
    useRefreshMutation,
    useSigninMutation,
    useSignupMutation,
    useVerifyEmailMutation,
    useRequestOTP2Mutation,
    useVerifyEmailtoResestMutation,
    useForgetPasswordMutation,
    useResetPasswordMutation,
    useChangePasswordMutation,
} = AuthApi;