import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "src/store";
import type { Member, MpData } from "src/models/member";
import { setAlertMessage } from "./alert";

interface SignupState {
  step: number;
}

export enum SliceStatusEnum {
  IDLE = "IDLE",
  LOADING = "LOADING",
  SUCCEEDED = "SUCCEEDED",
  FAILED = "FAILED"
}

interface MemberState {
  selectedMember: Member | null;
  members: Member[];
  status: SliceStatusEnum;
  error: string;
  signupState: SignupState;
}

const initialState: MemberState = {
  selectedMember: null,
  members: [],
  status: SliceStatusEnum.IDLE,
  error: null,
  signupState: {
    step: 0
  }
};

const slice = createSlice({
  name: "member",
  initialState,
  reducers: {
    setSelectedMember: (state, action) => {
      state.selectedMember = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembersList.pending, (state) => {
        state.status = SliceStatusEnum.LOADING;
      })
      .addCase(fetchMembersList.fulfilled, (state, action) => {
        state.status = SliceStatusEnum.SUCCEEDED;
        state.members = action.payload;
      })
      .addCase(fetchMembersList.rejected, (state, action) => {
        state.status = SliceStatusEnum.FAILED;
        state.error = action.error.message;
      });
  }
});

// fetch members from name search
export const fetchMembersList = createAsyncThunk<Member[], string>(
  "members/fetch",
  async (mpNameQuery, thunkAPI) => {
    try {
      const response = await fetch(
        `https://members-api.parliament.uk/api/Members/Search?Name=${mpNameQuery}`
      );
      const mpData: MpData = await response.json();
      const members = mpData.items
      return members
    } catch (error) {
      thunkAPI.dispatch(
        setAlertMessage({
          message:
            "There was an error fetching the list of MPs. Please refresh or try again later.",
          severity: "error"
        })
      );
      return thunkAPI.rejectWithValue(error.message || "An error occurred");
    }
  }
);

export const reducer = slice.reducer;
export const selectMembers = (state: RootState) => state.member.members;
export const selectMembersStatus = (state: RootState) => state.member.status
export const selectSelectedMember = (state: RootState) => state.member.selectedMember

export const { setSelectedMember } = slice.actions;

export default slice;
