import competitionSlice from "./competitionSlice";
import { CompetitionItem } from "./competitionsTypes";

const competitionsAPI = competitionSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompetitionByCategory: builder.query<CompetitionItem[], string>({
      query: (category) => `/${category}`,
      providesTags: (_result, _error, category) => [
        { type: "Competition", id: category },
        { type: "Competition", id: "ALL" }, // הוסף תג לכל התחרויות
      ],
    }),

    getLeadCompetitionsByCategory: builder.query<CompetitionItem[], string>({
      query: (category) => `/top/${category}`,
      providesTags: (_result, _error, category) => [
        { type: "TopCompetitions", id: category },
      ],
    }),

    createCompetition: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: "/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Competition" }],
    }),

    getUserCompetitionsByUserId: builder.query<CompetitionItem[], string>({
      query: (userId) => `/UserCompetitions/${userId}`,
      providesTags: (result, error, userId) => [{ type: "Competition", id: userId }],
    }),

    deleteCompetition: builder.mutation<void, string>({
      query: (competitionId) => ({
        url: `/${competitionId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, competitionId) => [
        { type: "Competition", id: competitionId },
        { type: "Competition", id: "ALL" }, // הוסף תג לכל התחרויות
      ],
    }),

    updateCompetitionRating: builder.mutation({
      query: ({ competitionId, rating, userId }) => ({
        url: `/update/${competitionId}`,
        method: "PUT",
        body: { rating, userId },
      }),
      invalidatesTags: (_result, _error, { category }) => [
        { type: "Competition", id: category },
        { type: "TopCompetitions", id: category },
      ],
    }),
  }),
})

export const {
  useGetCompetitionByCategoryQuery,
  useGetLeadCompetitionsByCategoryQuery,
  useCreateCompetitionMutation,
  useUpdateCompetitionRatingMutation,
  useGetUserCompetitionsByUserIdQuery,
  useDeleteCompetitionMutation
} = competitionsAPI;

export default competitionsAPI;
