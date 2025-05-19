import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const competitionSlice = createApi({
  reducerPath: "api/competitions", 
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3500/api/competitions'
  }),
  tagTypes: ["Competition"], 
  endpoints: (builder) => ({}) 
});

export default competitionSlice;
