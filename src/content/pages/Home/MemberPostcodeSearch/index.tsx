import { Search, KeyboardReturn } from "@mui/icons-material";
import { Box, Typography, InputAdornment, InputProps } from "@mui/material";
import { StyledTextField } from "src/components/Shared/StyledTextField";
import { fetchLocalMember } from "src/slices/member";
import { PostcodeValidationSchema } from "../SearchValidation";
import { useSearch } from "src/hooks/useSearch";

interface InputPropsOptions {
  returnPrompt: boolean;
}

export const SearchInputProps = ({ returnPrompt }: InputPropsOptions): InputProps => {
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

function MemberPostcodeSearch({onSearch}) {
  const { query, returnPrompt, error, handleChange, handleKeyPress } = useSearch({
    fetchAction: fetchLocalMember,
    validationSchema: PostcodeValidationSchema,
    onSearch,
    validationKey: 'postcode'
  });

  return (
    <Box px={"15px"}>
      <Box py={"5px"}>
        <Typography fontFamily={"Roboto Slab"} fontSize={20}>Find your local MP:</Typography>
      </Box>
      <Box py={"10px"}>
        <StyledTextField
          type="search"
          name="MP Name Search"
          value={query}
          label="Enter your postcode..."
          placeholder="Hit return to search"
          onChange={handleChange}
          onKeyUp={handleKeyPress}
          error={!!error}
          helperText={error}
          InputProps={SearchInputProps({ returnPrompt })}
        />
      </Box>
    </Box>
  );
}
export default MemberPostcodeSearch;
