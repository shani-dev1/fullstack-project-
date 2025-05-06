import competitionDemo from "./competitionSlice";

const competitionsAPI = competitionDemo.injectEndpoints({
  endpoints: (builder) => ({
    getCompetitionByCategory: builder.query({
      query: (category) => `/${category}`,
      providesTags: ["Competition"],
    }),
  }),
});

export const {
  useGetCompetitionByCategoryQuery,
} = competitionsAPI;

export default competitionsAPI;
