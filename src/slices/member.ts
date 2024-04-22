import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "src/store";
import type { Member, MpData, TwfyMember } from "src/models/member";
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
    },
    clearMembers: (state) => {
      state.members = null;
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
      })
      .addCase(fetchLocalMember.pending, (state) => {
        state.status = SliceStatusEnum.LOADING;
      })
      .addCase(fetchLocalMember.fulfilled, (state, action) => {
        state.status = SliceStatusEnum.SUCCEEDED;
      })
      .addCase(fetchLocalMember.rejected, (state, action) => {
        state.status = SliceStatusEnum.FAILED;
        state.error = action.error.message;
      });
  }
});

// fetch members from name search
export const fetchMembersList = createAsyncThunk<Member[], string>(
  "members/nameFetch",
  async (mpNameQuery, thunkAPI) => {
    try {
      const response = await fetch(
        `https://members-api.parliament.uk/api/Members/Search?Name=${mpNameQuery}`
      );
      const mpData: MpData = await response.json();
      const members = mpData.items;
      return members;
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

// fetch local member from postcode search
export const fetchLocalMember = createAsyncThunk<void, string>(
  "members/postcodeFetch",
  async (postcode, thunkAPI) => {
    try {
      const twfyKey = process.env.REACT_APP_TWFY_KEY;
      const response = await fetch(
        `https://www.theyworkforyou.com/api/getMP?key=${twfyKey}&postcode=${postcode}&output=json`
      );
      const res: TwfyMember = await response.json();
      const localMember = res.full_name;
      thunkAPI.dispatch(fetchMembersList(localMember));
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
export const selectMembersStatus = (state: RootState) => state.member.status;
export const selectSelectedMember = (state: RootState) =>
  state.member.selectedMember;

export const { setSelectedMember, clearMembers } = slice.actions;

export default slice;
