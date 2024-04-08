import { styled, TextField } from "@mui/material";

export const StyledTextField = styled(TextField)(
    () => `
      .MuiOutlinedInput-notchedOutline {
        border-radius: 4px;
      }
      .MuiInputLabel-root {
        line-height: 24px;
        position: absolute;
        top: -7px;
      }
      .MuiFormHelperText-root {
        margin-bottom: 15px
      }
      & input[type="search"]::-webkit-search-cancel-button {
        -webkit-appearance: none;
        display: none;
      }
    `
  );