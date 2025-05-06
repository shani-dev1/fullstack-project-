import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const competitionDemo = createApi({
  reducerPath: "api/competitions", 
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5050/api/competitions'
  }),
  tagTypes: ["Competition"], 
  endpoints: (builder) => ({}) 
});

export default competitionDemo;
