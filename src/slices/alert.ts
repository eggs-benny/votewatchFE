import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AppThunk } from 'src/store';
import { AlertColor } from '@mui/material';
import { sleep } from 'src/utils/sleep';

interface AlertMessageState {
    show?: boolean;
    message: string,
    severity: AlertColor
}

const initialState: AlertMessageState = {
    show: false,
    message: "",
    severity: "warning"
};

const slice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlertMessage(state: AlertMessageState, action: PayloadAction<AlertMessageState>) {
      if (action.payload) {
        state.show = true;
        state.message = action.payload.message;
        state.severity = action.payload.severity;
      }
    },
    hideAlertMessage(state: AlertMessageState, action: PayloadAction<void>) {
        state.show = false;
    }
  }
});

export const setAlertMessage =
  (data: AlertMessageState): AppThunk =>
    async (dispatch): Promise<void> => {
        dispatch(slice.actions.setAlertMessage(data));
        await sleep(5000);
        dispatch(slice.actions.hideAlertMessage());
    };

export const hideAlertMessage =
    (): AppThunk =>
    async (dispatch): Promise<void> => {
        dispatch(slice.actions.hideAlertMessage());
};

export const reducer = slice.reducer;

export default slice;