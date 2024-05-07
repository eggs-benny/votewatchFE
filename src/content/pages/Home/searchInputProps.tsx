import { KeyboardReturn, Search } from "@mui/icons-material";
import { InputAdornment, InputProps } from "@mui/material";

export const SearchInputProps = ({
    returnPrompt
  }: {
    returnPrompt: boolean;
  }): InputProps => {
    return {
      sx: {
        height: "40px"
      },
      startAdornment: (
        <InputAdornment position="start">
          {returnPrompt && <KeyboardReturn sx={{ color: "lightgray" }} />}
        </InputAdornment>
      ),
      endAdornment: (
        <InputAdornment position="end">
          <Search sx={{ color: "lightgray" }} />
        </InputAdornment>
      )
    };
  };

  export default SearchInputProps