import apiSlice from "./authSlice";

const authAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Users"],
    }),
    signIn: builder.mutation({
      query: (credentials) => ({
        url: "/auth/signin",
        method: "POST",
        body: credentials,
      }),
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
    }),

  }),
});

export const {
  useCreateUserMutation,
  useSignInMutation,
  useDeleteUserMutation
} = authAPI;

export default authAPI;
