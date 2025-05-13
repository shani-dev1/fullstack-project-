import { createSlice } from "@reduxjs/toolkit";
import { CategoryKeys } from "./competitionsTypes";

interface CompetitionsState {
  val: string;
  currentCompetition: CategoryKeys;
}

const initialState: CompetitionsState = {
  val: "competition",
  currentCompetition: "exams",
};

const competitionsSlice = createSlice({
  name: "competition",
  initialState,
  reducers: {
    chooseCompetition: (state, action: { payload: CategoryKeys }) => {
      state.currentCompetition = action.payload;
    },
  },
});

export const { chooseCompetition } = competitionsSlice.actions;
export const selectCurrentCompetition = (state: { competition: CompetitionsState }) =>
state.competition.currentCompetition;

export default competitionsSlice.reducer;