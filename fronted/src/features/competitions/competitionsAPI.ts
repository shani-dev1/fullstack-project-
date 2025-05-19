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
      query: ({ competitionId, rating }) => ({
        url: `/update/${competitionId}`,
        method: "PUT",
        body: { rating },
      }),
      invalidatesTags: ["Competition"],
    }),
  }),
});

export const {
  useGetCompetitionByCategoryQuery,
  useCreateCompetitionMutation,
  useUpdateCompetitionRatingMutation,

} = competitionsAPI;

export default competitionsAPI;
