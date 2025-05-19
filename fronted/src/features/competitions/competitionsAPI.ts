import competitionSlice from "./competitionSlice";

const competitionsAPI = competitionSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompetitionByCategory: builder.query({
      query: (category) => `/${category}`,
      providesTags: ["Competition"],
    }),

    createCompetition: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: "/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Competition"],
    }),

    updateCompetitionRating: builder.mutation({
      query: ({ competitionId, rating, userId }) => ({
        url: `/update/${competitionId}`,
        method: "PUT",
        body: { rating, userId },
      }),
      invalidatesTags: ["Competition"],
    }),

    deleteCompetition: builder.mutation<void, string>({
      query: (competitionId) => ({
        url: `/${competitionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Competition"],
    }),
  }),
});

export const {
  useGetCompetitionByCategoryQuery,
  useCreateCompetitionMutation,
  useUpdateCompetitionRatingMutation,
  useDeleteCompetitionMutation,
} = competitionsAPI;

export default competitionsAPI;
