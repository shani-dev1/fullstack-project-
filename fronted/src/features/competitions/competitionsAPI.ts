import competitionSlice from "./competitionSlice";
import { CompetitionItem, QuestionData } from "./competitionsTypes";

const competitionsAPI = competitionSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompetitionByCategory: builder.query<CompetitionItem[], string>({
      query: (category) => `/${category}`,
      providesTags: (_result, _error, category) => [
        { type: "Competition", id: category },
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
      invalidatesTags: ["Competition"],
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

    generateQuestion: builder.mutation<QuestionData, { topic: string }>({
      query: ({ topic }) => ({
        url: '/generate-question',
        method: 'POST',
        body: {
          prompt: `Write a multiple-choice question about ${topic} with 4 answers in the format: A), B), C), D). At the end of the question, add a line with (Correct answer: <letter>)`,
        },
      }),
    }),
  }),
})
export const {
  useGetCompetitionByCategoryQuery,
  useGetLeadCompetitionsByCategoryQuery,
  useCreateCompetitionMutation,
  useUpdateCompetitionRatingMutation,
  useGetUserCompetitionsByUserIdQuery,
  useDeleteCompetitionMutation,
  useGenerateQuestionMutation
} = competitionsAPI;

export default competitionsAPI