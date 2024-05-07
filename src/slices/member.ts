import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "src/store";
import type {
  ContactInfo,
  Member,
  MpData,
  TwfyMember
} from "src/models/member";
import { setAlertMessage } from "./alert";

export enum SliceStatusEnum {
  IDLE = "IDLE",
  LOADING = "LOADING",
  SUCCEEDED = "SUCCEEDED",
  FAILED = "FAILED"
}

interface MemberState {
  selectedMember: Member | null;
  members: Member[];
  contactInfo: ContactInfo;
  status: SliceStatusEnum;
  error: string;
}

const initialState: MemberState = {
  selectedMember: null,
  members: [],
  contactInfo: null,
  status: SliceStatusEnum.IDLE,
  error: null
};

const slice = createSlice({
  name: "member",
  initialState,
  reducers: {
    setSelectedMember: (state, action) => {
      state.selectedMember = action.payload;
    },
    clearMembers: (state) => {
      state.status = SliceStatusEnum.IDLE;
      state.members = [];
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
      })
      .addCase(fetchMemberContactInfo.pending, (state) => {
        state.status = SliceStatusEnum.LOADING;
      })
      .addCase(fetchMemberContactInfo.fulfilled, (state, action) => {
        state.status = SliceStatusEnum.SUCCEEDED;
        state.contactInfo = action.payload;
      })
      .addCase(fetchMemberContactInfo.rejected, (state, action) => {
        state.status = SliceStatusEnum.FAILED;
        state.error = action.error.message;
      });
  }
});

// fetch current members from name search
export const fetchMembersList = createAsyncThunk<Member[], string>(
  "members/nameFetch",
  async (mpNameQuery, thunkAPI) => {
    try {
      const response = await fetch(
        `https://members-api.parliament.uk/api/Members/Search?Name=${mpNameQuery}&IsCurrentMember=true`
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
            "There was an error fetching this local MP. Please refresh or try again later.",
          severity: "error"
        })
      );
      return thunkAPI.rejectWithValue(error.message || "An error occurred");
    }
  }
);

// fetch member's contact info (for email)
export const fetchMemberContactInfo = createAsyncThunk<ContactInfo, number>(
  "member/contactInfoFetch",
  async (memberId, thunkAPI) => {
    try {
      const response = await fetch(
        `https://members-api.parliament.uk/api/Members/${memberId}/Contact`
      );
      const contactData: ContactInfo = await response.json();
      return contactData;
    } catch (error) {
      thunkAPI.dispatch(
        setAlertMessage({
          message:
            "There was an error fetching this MP's contact info. Please refresh or try again later.",
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
export const selectMemberContactInfo = (state: RootState) =>
  state.member.contactInfo;

export const { setSelectedMember, clearMembers } = slice.actions;

export default slice;
