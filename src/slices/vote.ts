import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "src/store";
import { setAlertMessage } from "./alert";
import { SliceStatusEnum } from "./member";
import { Division } from "src/models/division";

interface VoteState {
  votes: Division[];
  status: SliceStatusEnum;
  error: string;
}

const initialState: VoteState = {
  votes: [],
  status: SliceStatusEnum.IDLE,
  error: null
};

const slice = createSlice({
  name: "vote",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMemberVotes.pending, (state) => {
        state.status = SliceStatusEnum.LOADING;
      })
      .addCase(fetchMemberVotes.fulfilled, (state, action) => {
        state.status = SliceStatusEnum.SUCCEEDED;
        state.votes = action.payload;
      })
      .addCase(fetchMemberVotes.rejected, (state, action) => {
        state.status = SliceStatusEnum.FAILED;
        state.error = action.error.message;
      });
  }
});

// fetch votes from selected member
export const fetchMemberVotes = createAsyncThunk<Division[], number>(
  "votes/fetchRecent",
  async (memberId, thunkAPI) => {
    try {
      const response = await fetch(
        `https://commonsvotes-api.parliament.uk/data/divisions.json/membervoting?queryParameters.memberId=${memberId}&queryParameters.take=10`
      );
      const voteData: Division[] = await response.json();
      return voteData;
    } catch (error) {
      thunkAPI.dispatch(
        setAlertMessage({
          message:
            "There was an error fetching the list of recent MP votes. Please refresh or try again later.",
          severity: "error"
        })
      );
      return thunkAPI.rejectWithValue(error.message || "An error occurred");
    }
  }
);

export const reducer = slice.reducer;
export const selectVotes = (state: RootState) => state.vote.votes;
export const selectVotesStatus = (state: RootState) => state.vote.status;

export default slice;
