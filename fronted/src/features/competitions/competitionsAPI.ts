import competitionDemo from "./competitionSlice";

const competitionsAPI = competitionDemo.injectEndpoints({
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
  }),
});

export const {
  useGetCompetitionByCategoryQuery,
  useCreateCompetitionMutation,
} = competitionsAPI;

export default competitionsAPI;
